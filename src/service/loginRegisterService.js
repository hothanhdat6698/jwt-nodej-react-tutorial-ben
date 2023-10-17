require("dotenv").config();
import db from "../models/index";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { getGroupWithRoles } from "../service/JWTService";
import { createJWT } from "../middleware/JWTAction";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail },
    });

    if (user) {
        return true;
    } else {
        return false;
    }
};

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone },
    });

    if (user) {
        return true;
    } else {
        return false;
    }
};

const registerNewUser = async (rawUserData) => {
    try {
        // check email/ phone number are exist
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: "The email is already exist",
                EC: 1,
            };
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist === true) {
            return {
                EM: "The phone is already exist",
                EC: 1,
            };
        }
        // hash user password
        let hashPassword = hashUserPassword(rawUserData.password);

        // create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone,
            groupId: 4,
        });
        return {
            EM: "A user is created succsessfully",
            EC: 0,
        };
    } catch (err) {
        console.log(err);
        return {
            EM: "Something went wrong",
            EC: -2,
        };
    }
};

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); // true
};

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin },
                ],
            },
        });
        if (user) {
            let isCorrectPassword = checkPassword(
                rawData.password,
                user.password
            );
            if (isCorrectPassword === true) {
                // let token

                // test roles:
                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    username: user.username,
                    expiresIn: process.env.JWT_EXPPIRES_IN,
                };
                let token = createJWT(payload);
                return {
                    EM: "ok!",
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles,
                        email: user.email,
                        username: user.username,
                    },
                };
            }
        }

        return {
            EM: "Your email/phone number or password is incorrect",
            EC: 1,
            DT: "",
        };
    } catch (err) {
        console.log(err);
        return {
            EM: "Something went wrong",
            EC: -2,
        };
    }
};

module.exports = {
    registerNewUser,
    handleUserLogin,
    hashUserPassword,
    checkEmailExist,
    checkPhoneExist,
};

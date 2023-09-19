import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "jwt",
        Promise: bluebird,
    });
    try{
        const [rows, fields] = await connection.execute(
            "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
            [email, hashPass, username]
        );
    }
    catch(err) {
        console.log("check error",err);
    }
    
};

const getUserList = async () => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "jwt",
        Promise: bluebird,
    });
    

    try {
        const [rows, fields] = await connection.execute("SELECT * from users ");
        return rows;
    } catch (err) {
        console.log("check error", err);
    }
};

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "jwt",
        Promise: bluebird,
    });
    
    try {
        const [rows, fields] = await connection.execute("DELETE FROM users WHERE id=?",[id]);
        return rows;
    } catch (err) {
        console.log("check error", err);
    }
}



module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
};

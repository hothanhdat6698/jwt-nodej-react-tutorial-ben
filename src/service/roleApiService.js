import db from "../models/index";

const createNewRoles = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ["url", "description"],
            raw: true,
        });

        const persists = roles.filter(
            ({ url: url1 }) =>
                !currentRoles.some(({ url: url2 }) => url1 === url2)
        );
        if (persists === 0) {
            return {
                EM: "Nothing to create",
                EC: 0,
                DT: [],
            };
        }
        await db.Role.bulkCreate(persists);
        return {
            EM: `Create role success ${persists.length}`,
            EC: 0,
            DT: [],
        };
    } catch (err) {
        console.log(err);
        return {
            EM: "something wrong with service",
            EC: 1,
            DT: [],
        };
    }
};

const getAllRoles = async () => {
    try {
        let data = await db.Role.findAll({
            order: [["id", "DESC"]],
        });
        return {
            EM: `Get all role success`,
            EC: 0,
            DT: data,
        };
    } catch (err) {
        console.log(err);
        return {
            EM: "something wrong with service",
            EC: 1,
            DT: [],
        };
    }
};

const deleteRole = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: { id: id },
        });
        if (role) {
            await role.destroy();
        }
        return {
            EM: `Delete role success`,
            EC: 0,
            DT: [],
        };
    } catch (err) {
        console.log(err);
        return {
            EM: "something wrong with service",
            EC: 1,
            DT: [],
        };
    }
};

const getRoleByGroup = async (id) => {
    try {
        if (!id) {
            return {
                EM: `Not found any role`,
                EC: 0,
                DT: [],
            };
        }

        let roles = await db.Group.findOne({
            where: { id: id },
            attributes: ["id", "name", "description"],
            include: {
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] },
            },
        });

        return {
            EM: `get role by group`,
            EC: 0,
            DT: roles,
        };
    } catch (err) {
        console.log(err);
        return {
            EM: "something wrong with service",
            EC: 1,
            DT: [],
        };
    }
};

module.exports = {
    createNewRoles,
    getAllRoles,
    deleteRole,
    getRoleByGroup,
};

import loginRegisterService from "../service/loginRegisterService";

const testApi = (req, res) => {
    res.status(200).json({
        message: "ok",
        data: "test-api",
    });
};

const handleRegister = async (req, res) => {
    try {
        // req.body
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: "Missing required params", // error message
                EC: "1", // error code
                DT: "", //data
            });
        }
        if (req.body.password && req.body.length < 4) {
            return res.status(200).json({
                EM: "Your password must have more than 3 letters", // error message
                EC: "1", // error code
                DT: "", //data
            });
        }

        // service: create user
        let data = await loginRegisterService.registerNewUser(req.body);

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: "", //data
        });
    } catch (e) {
        res.status(500).json({
            EM: "error from server", // error message
            EC: "-1", // error code
            DT: "", //data
        });
    }
};

const handleLogin = async (req, res) => {
    try {
       let data = await loginRegisterService.handleUserLogin(req.body);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, //data
        });
    } catch (err) {
        return res.status(500).json({
            EM: "error from server", // error message
            EC: "-1", // error code
            DT: "", //data
        });
    }
};
module.exports = {
    testApi,
    handleRegister,
    handleLogin,
};

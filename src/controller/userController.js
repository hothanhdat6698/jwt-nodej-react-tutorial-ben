import userApiService from "../service/userApiService";

const readFunc = async (req, res) => {
    try {
        let data = await userApiService.getAllUser();

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, //data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "error from server", // error message
            EC: "-1", // error code
            DT: "", //data
        });
    }
};

const createFunc = async (req, res) => {
    try{

    }catch(e){
        console.log(e);
        return res.status(500).json({
            EM: "error from server", // error message
            EC: "-1", // error code
            DT: "", //data
        });
    }
};

const updateFunc = async (req, res) => {
    try{

    }catch(e){
        console.log(e);
        return res.status(500).json({
            EM: "error from server", // error message
            EC: "-1", // error code
            DT: "", //data
        });
    }
};

const deleteFunc = async (req, res) => {
    try{

    }catch(e){
        console.log(e);
        return res.status(500).json({
            EM: "error from server", // error message
            EC: "-1", // error code
            DT: "", //data
        });
    }
};

module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc,
};

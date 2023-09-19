import express from "express";
import homeCotroller from "../controller/homeController";


const router = express.Router();

/**
 * express app
 */



const initWebRoutes = (app) => {
    // patch,handler
    router.get("/", homeCotroller.handleHelloWorld);
    router.get("/user", homeCotroller.handleUserPage);
    router.post("/user/create-user", homeCotroller.handleCreateNewUser);
    router.post("/delete-user/:id", homeCotroller.handleDeleteUser);
    router.get("/update-user/:id", homeCotroller.getUpdateUserPage);
    router.post("/user/update-user", homeCotroller.handleUpdateUser);
    return app.use("/", router);
}

export default initWebRoutes;
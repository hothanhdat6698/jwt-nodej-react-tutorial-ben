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
    router.post("/user/create-user", homeCotroller.handleCreateNewUser)

    return app.use("/", router);
}

export default initWebRoutes;
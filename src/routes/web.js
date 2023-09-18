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
    

    return app.use("/", router);
}

export default initWebRoutes;
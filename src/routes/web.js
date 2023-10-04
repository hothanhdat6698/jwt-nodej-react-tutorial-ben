import express from "express";
import homeCotroller from "../controller/homeController";
import apiController from "../controller/apiController"


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

    // rest api
    //GET-Read POST-Create PUT-Update DELETE-Delete
    router.get("/api/test-api", apiController.testApi);


    return app.use("/", router);
}

export default initWebRoutes;
import express from "express";
import homeController from "../constrollers/homeController";
import userController from "../constrollers/userControlers";

let router = express.Router();

let initWebRouters = (app) => {
  router.get("/", homeController.getHomePage);

  router.get("/crud", homeController.getCrudPage);
  router.post("/post-crud", homeController.postCrud);
  router.get("/get-crud", homeController.displayGetCrud);
  router.get("/edit-crud", homeController.getEditCrud);
  router.post("/put-crud", homeController.putCrud);
  router.get("/delete-crud", homeController.deleteCrud);

  //API
  router.post("/api/login", userController.handleLogin);

  //users
  router.get("/api/users", userController.handleGetUsers);

  return app.use("/", router);
};

module.exports = initWebRouters;

const { Router } = require("express");
const dataRouter = Router();
const dataController = require("../controllers/dataController");

dataRouter.route("/feed").get(dataController.checkController);

dataRouter.route("/users").get(dataController.getAllUsers).post(dataController.sendRequest)


module.exports = dataRouter;

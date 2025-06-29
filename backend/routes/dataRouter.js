const { Router } = require("express");
const dataRouter = Router();
const dataController = require("../controllers/dataController");

dataRouter.route("/feed").get(dataController.getFeed);

dataRouter
  .route("/users")
  .get(dataController.getAllUsers)
  .post(dataController.followRequestHandler);

  dataRouter
  .route("/posts")
  // .get(dataController.getAllUsers)
  .post(dataController.createPost);

module.exports = dataRouter;

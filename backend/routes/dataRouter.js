const { Router } = require("express");
const dataRouter = Router();
const dataController = require("../controllers/dataController");

dataRouter.route("/feed").get(dataController.getFeed);

dataRouter.route("/explore").get(dataController.getAllPost);

dataRouter
  .route("/likes")
  .post(dataController.createLikePost)
  .get(dataController.getLikedPost);

dataRouter
  .route("/users")
  .get(dataController.getAllUsers)
  .post(dataController.followRequestHandler);

dataRouter
  .route("/posts")
  // .get(dataController.getAllUsers)
  .post(dataController.createPost);

dataRouter.route("likes").post(dataController.createlikeHandler);

dataRouter.route("comments").post(dataController.createCommentHandler);

module.exports = dataRouter;

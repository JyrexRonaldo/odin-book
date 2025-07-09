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
  .route("/users/:username")
  .get(dataController.getUserProfileByUsername);

dataRouter.route("/profile").put(dataController.editProfileInfo);

dataRouter
  .route("/posts")
  // .get(dataController.getAllUsers)
  .post(dataController.createPost)
  .delete(dataController.deletePostById);

dataRouter.route("/comments").post(dataController.createCommentHandler).delete(dataController.deleteCommentById)
dataRouter.route("/comments/:postId").get(dataController.getCommentsByPostId);

module.exports = dataRouter;

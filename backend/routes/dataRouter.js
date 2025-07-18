const { Router } = require("express");
const dataRouter = Router();
const dataController = require("../controllers/dataController");

dataRouter.route("/feed").get(dataController.getFeed);

dataRouter.route("/explore").get(dataController.getAllPost);

dataRouter
  .route("/likes")
  .post(dataController.createLikePost)
  .get(dataController.getLikedPost);

dataRouter.route("/comment-likes").post(dataController.createLikeComment);

dataRouter
  .route("/users")
  .get(dataController.getAllUsers)
  .post(dataController.followRequestHandler);

dataRouter
  .route("/users/:username")
  .get(dataController.getUserProfileByUsername)
  .delete(dataController.deleteUserByUsername);

dataRouter.route("/profile").put(dataController.editProfileInfo);

dataRouter
  .route("/posts")
  // .get(dataController.getAllUsers)
  .post(dataController.createPost)
  .delete(dataController.deletePostById);

// dataRouter.route("/posts/:userId").get(dataController.getPostById);

dataRouter.route("/posts/:postId").get(dataController.getPostByPostId);

dataRouter
  .route("/comments")
  .post(dataController.createCommentHandler)
  .delete(dataController.deleteCommentById)
  .put(dataController.editCommentById);

dataRouter.route("/comments/:postId").get(dataController.getCommentsByPostId);

dataRouter.route("/messages").post(dataController.createMessage);

dataRouter.route("/messages/:userId").get(dataController.getMessagesByUserId);

module.exports = dataRouter;

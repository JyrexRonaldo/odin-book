const { Router } = require("express");
const dataRouter = Router();
const dataController = require("../controllers/dataController");

dataRouter
  .route("/feed")
  .get(
    dataController.checkController
  );

module.exports = dataRouter;

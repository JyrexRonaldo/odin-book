const prisma = require("../config/prisma");
const asyncHandler = require("express-async-handler");

const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await prisma.user.findMany({
    include: {
      followedBy: true,
      following: true,
    },
  });

  // allUsers.followedBy.forEach((followers) => {
  //   if ((followers.followingId = req)) {
  //   }
  // });

  console.log(allUsers);
  res.json(allUsers);
});

function checkController(req, res) {
  console.log("Hello backend");
}

const sendRequest = asyncHandler(async (req, res) => {
  const { followeeId } = req.body;
  console.log(typeof req.user.id);
  console.log(typeof followeeId);
  await prisma.follows.create({
    data: {
      followedById: +followeeId,
      followingId: req.user.id,
    },
  });
  res.status(201).json("Request sent");
});

module.exports = { checkController, getAllUsers, sendRequest };

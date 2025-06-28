const prisma = require("../config/prisma");
const asyncHandler = require("express-async-handler");

const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await prisma.user.findMany({
    include: {
      followedBy: true,
      following: true,
    },
  });
  res.json(allUsers);
});

function checkController(req, res) {
  console.log("Hello backend");
}

const followRequestHandler = asyncHandler(async (req, res) => {
  const { followeeId } = req.body;

  const allFollows = await prisma.follows.findMany();

  let followAction = false;
  allFollows.forEach((follow) => {
    if (
      follow.followedById === +followeeId &&
      follow.followingId === req.user.id
    ) {
      followAction = true;
    }
  });

  if (followAction) {
    // console.log("unfollowed")
    await prisma.follows.delete({
      where: {
        followingId_followedById: {
          followedById: +followeeId,
          followingId: req.user.id,
        },
      },
    });
  } else {
    // console.log("is following")
    await prisma.follows.create({
      data: {
        followedById: +followeeId,
        followingId: req.user.id,
      },
    });
  }

  res.status(201).json("Request sent");
});


module.exports = {
  checkController,
  getAllUsers,
  followRequestHandler,

};

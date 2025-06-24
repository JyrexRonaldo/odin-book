const prisma = require("../config/prisma");
const asyncHandler = require("express-async-handler");

const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
  res.json(allUsers);
});

function checkController(req, res) {
  console.log("Hello backend");
}

const sendRequest = asyncHandler(async (req, res) => {
  const { receiverId } = req.body;
  console.log(req.user);
  console.log(receiverId);
  await prisma.request.create({
    data: {
      senderId: req.user.id,
      receiverId: +receiverId,
    },
  });
  res.status(201).json("Request sent");
  // res.end()
});

module.exports = { checkController, getAllUsers, sendRequest };

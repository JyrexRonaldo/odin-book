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
  console.log(typeof req.user.id);
  console.log(typeof receiverId);
  await prisma.requests.create({
    data: {
      incomingRequestsId: +receiverId,
      outgoingRequestsId: req.user.id,
    },
  });
  res.status(201).json("Request sent");
});

module.exports = { checkController, getAllUsers, sendRequest };

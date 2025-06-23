const prisma = require("../config/prisma");
const asyncHandler = require("express-async-handler");

const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers)
  res.json(allUsers);
});

function checkController(req, res) {
  // await prisma.user.update({
  //   user: f
  // })
}

module.exports = { checkController, getAllUsers };

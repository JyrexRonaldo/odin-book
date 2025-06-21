const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      username,
      email,
      password: hashedPassword,
    },
  });
  res.json("Registration successful! You can now login.");
});

const handleSignIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "14d" }
  );

  return res.status(200).json({
    message: "Welcome",
    token: `Bearer ${token}`,
    userId: user.id,
    email: user.email,
  });
});

module.exports = { createUser, handleSignIn };

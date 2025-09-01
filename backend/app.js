require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/authRouter");
const passport = require("./config/passport");
const { session } = require("passport");
const dataRouter = require("./routes/dataRouter");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3000;

app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
  },
});

app.use(express.json());

app.use("/auth", authRouter);
app.use(passport.authenticate("jwt", { session: false }));
app.use("/", dataRouter);
app.use((err, req, res, next) => {
  // console.log(err.meta.modelName);
  // console.log(err.code);
  // if (err.code === "P2002" && err.meta.modelName === "Requests") {
  //   res.status(400).json("Request already sent");
  // } else {
  // console.log(err.code, err.meta.modelName, err.meta.target[0]);
  if (
    (err.code === "P2002",
    err.meta.modelName === "User",
    err.meta.target[0] === "username")
  ) {
    res.status(401).json(err.message);
  } else if (
    (err.code === "P2002",
    err.meta.modelName === "User",
    err.meta.target[0] === "email")
  ) {
    res.status(402).json(err.message);
  } else {
    res.status(500).json(err.message);
  }
  // }
});

io.on("connection", (socket) => {
  socket.on("message", () => {
    io.emit("message");
  });
});

server.listen(PORT, () => {
  console.log(`Express app running at port ${PORT}`);
});

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
   methods: ['GET', 'PUT', 'POST', 'DELETE'],
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
  res.status(500).json(err.message);
  // }
});

io.on("connection", (socket) => {
  socket.on('message', () => {
    io.emit('message')
  })
});


server.listen(PORT, () => {
  console.log(`Express app running at port ${PORT}`);
});

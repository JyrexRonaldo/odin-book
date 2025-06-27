require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/authRouter");
const passport = require("./config/passport");
const { session } = require("passport");
const dataRouter = require("./routes/dataRouter");

app.use(cors());
app.use(express.json());


app.use("/auth", authRouter);
app.use(passport.authenticate("jwt", { session: false }));
app.use("/", dataRouter);
app.use((err, req, res, next) => {
  // console.log(err.meta.modelName);
  // console.log(err.code);
  if (err.code === "P2002" && err.meta.modelName === "Requests") {
    res.status(400).json("Request already sent");
  } else {
    res.status(500).json(err.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express app running at port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();
//Middelwares
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
//Routes
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
//Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running On Port ${port}`));

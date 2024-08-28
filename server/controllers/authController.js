const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const {
  createActivationToken,
  createRefreshToken,
  createAccessToken,
} = require("../utils/tokens");
const { sendEmail } = require("./sendMail");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please fill in all fields." });
    const isExistUser = await User.findOne({ email });
    if (isExistUser)
      return res.status(400).json({ message: "This user is already exist" });
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };
    const activationToken = createActivationToken(newUser);
    const url = `${process.env.CLIENT_URL}/auth/activate/${activationToken}`;
    sendEmail(email, url, "Verify your email adress");
    res.status(200).json({
      message: "Register Success! Please activate your email to start",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const activateEmail = async (req, res) => {
  try {
    const { activationToken } = req.body;
    const user = jwt.verify(
      activationToken,
      process.env.ACTIVATION_TOKEN_SECRET
    );
    const { name, email, password } = user;
    const isExistUser = await User.findOne({ email });
    if (isExistUser)
      return res.status(400).json({ message: "This user is already exist" });
    const newUser = await User({ name, email, password });
    await newUser.save();
    res.status(200).json({ message: "Account has been activated!!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExistUser = await User.findOne({ email });
    if (!isExistUser)
      return res.status(400).json({ message: "User dosen't exist" });
    if (await bcrypt.compare(password, isExistUser.password)) {
      const refreshToken = createRefreshToken({ _id: isExistUser._id });
      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ message: "Login Success" });
    } else {
      return res.status(400).json({ message: "Invalid password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshtoken;
    if (!refreshToken)
      return res.status(400).json({ message: "Please login now!!" });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ message: "Please login now!!" });
      const accessToken = createAccessToken({ _id: user._id });
      res.json({ accessToken });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const isExistUser = await User.findOne({ email });
    if (!isExistUser)
      return res.status(400).json({ message: "User doesn't exist" });
    const accessToken = createAccessToken({ _id: isExistUser._id });
    const url = `${process.env.CLIENT_URL}/auth/reset/${accessToken}`;
    sendEmail(email, url, "Reset your password");
    res
      .status(200)
      .json({ message: "Re-send the password, please check your email." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(req.user._id, { password: hashedPassword });
    res.status(200).json({ message: "Password successfully changed!!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logOutUser = async (req, res) => {
  try {
    res.cookie("refreshtoken", "", { maxAge: 1 });
    res.status(200).json({ message: "Logged In." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
  activateEmail,
  loginUser,
  getAccessToken,
  forgotPassword,
  resetPassword,
  logOutUser,
};

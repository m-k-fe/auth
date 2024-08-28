const express = require("express");
const router = express.Router();
const {
  registerUser,
  activateEmail,
  loginUser,
  getAccessToken,
  forgotPassword,
  resetPassword,
  logOutUser,
} = require("../controllers/authController");
const { auth } = require("../middelwares/authMiddelware");

router.post("/register", registerUser);
router.post("/activation", activateEmail);
router.post("/login", loginUser);
router.get("/refreshtoken", getAccessToken);
router.post("/forgot", forgotPassword);
router.post("/reset", auth, resetPassword);
router.get("/logout", logOutUser);

module.exports = router;

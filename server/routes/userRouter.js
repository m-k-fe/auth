const express = require("express");
const router = express.Router();
const { auth } = require("../middelwares/authMiddelware");
const { authAdmin } = require("../middelwares/authAdminMiddelware");
const {
  getUserInfo,
  getAllUsersInfo,
  updateUser,
  updateUsersRole,
  deleteUser,
} = require("../controllers/userController");

router.get("/info", auth, getUserInfo);
router.get("/all-info", auth, authAdmin, getAllUsersInfo);
router.patch("/update", auth, updateUser);
router.patch("/update-role/:id", auth, authAdmin, updateUsersRole);
router.delete("/delete/:id", auth, authAdmin, deleteUser);

module.exports = router;

const User = require("../models/userModel");

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsersInfo = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    await User.findByIdAndUpdate(req.user._id, { name, avatar });
    res.status(200).json({ message: "Update Success!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUsersRole = async (req, res) => {
  try {
    const { role } = req.body;
    await User.findByIdAndUpdate(req.params.id, { role });
    res.status(200).json({ message: "Update Success!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted Success!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUserInfo,
  getAllUsersInfo,
  updateUser,
  updateUsersRole,
  deleteUser,
};

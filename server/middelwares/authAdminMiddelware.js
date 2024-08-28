const User = require("../models/userModel");
const authAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== "admin")
      return res.status(400).json({ message: "Admin resources access denied" });
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  authAdmin,
};

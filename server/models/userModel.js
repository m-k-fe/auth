const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("user", userSchema);
module.exports = User;

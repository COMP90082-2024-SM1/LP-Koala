const mongoose = require("mongoose");

// Create a schema for user model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name here."],
  },
  password: {
    type: String,
    required: [true, "Please enter password here."],
    select: false,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["rater", "researcher", "admin"],
    default: "rater",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

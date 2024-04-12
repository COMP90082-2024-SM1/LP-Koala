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
});

const User = mongoose.model("User", userSchema);

module.exports = User;

const User = require("../models/userModel");
const asyncCatch = require("../utils/asyncCatch");
exports.signup = asyncCatch(async (req, res, next) => {
  // Create new user object
  console.log(req.body);
  const newUser = await User.create({
    name: req.body.name,
    password: req.body.password,
  });

  // Send response
  res.status(201).json({
    status: "success",
    data: { user: newUser },
  });
});

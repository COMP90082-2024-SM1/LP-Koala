const User = require('../models/userModel');
const asyncCatch = require('../utils/asyncCatch');
exports.createUser = asyncCatch(async (req, res, next) => {
  // Create new user object
  console.log(req.body);
  const newUser = await User.create({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  });

  // Send response
  res.status(201).json({
    status: 'success',
    data: { user: newUser },
  });
});

exports.updateName = asyncCatch(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { name: req.body.name },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

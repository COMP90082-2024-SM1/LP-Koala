const User = require("../models/userModel");
const asyncCatch = require("../utils/asyncCatch");
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
    status: "success",
    data: { user: newUser },
  });
});

exports.findUser = asyncCatch(async (req, res, next)=>{

  const user = await User.findById(req.params.userId)
  console.log(req.params)
  res.status(200).json({
    status: "success",
    user:{
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role
      }
  })
})

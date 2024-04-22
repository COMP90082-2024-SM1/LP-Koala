const User = require('../models/userModel');
const AppError = require('../utils/appError');
const asyncCatch = require('../utils/asyncCatch');
const factory = require('../controllers/handlerFactory');
const Project = require('../models/projectModel');
exports.createUser = asyncCatch(async (req, res, next) => {
  let newUser;
  // Ensure projects exist
  // TODO: Think about deleting user on the effect on projects/modules (include both rater and researcher)
  // TODO: Think about creating user on the effect on modules (Have to update manually)
  if (req.body.role == 'rater') {
    const allocatedProjectIds = req.body.projects;

    if (!allocatedProjectIds || allocatedProjectIds == []) {
      return next(
        new AppError(
          'A rater must be allocated to a project when created.',
          400
        )
      );
    }
    allocatedProjectIds.forEach(async (id) => {
      await Project.findById(id);
    });

    // Create new user object
    newUser = await User.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    });
    // Update projects
    console.log('GOING TO UPDATE PROJECTS');
    allocatedProjectIds.forEach(async (id) => {
      await Project.findByIdAndUpdate(
        id,
        { $push: { raters: newUser.id } },
        { new: true, runValidators: true }
      );
    });
  } else {
    // Create new user object
    newUser = await User.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    });
  }

  // Send response
  res.status(201).json({
    status: 'success',
    data: { user: newUser },
  });
});

exports.findUser = asyncCatch(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  res.status(200).json({
    status: 'success',
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    },
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

exports.getUsers = asyncCatch(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});
exports.forbidSelfDelete = (req, res, next) => {
  if (req.params.id == req.user.id) {
    return next(new AppError('You cannot delete your own account.', 405));
  }
  next();
};

exports.deleteUser = factory.deleteOneDoc(User);

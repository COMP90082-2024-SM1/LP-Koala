const Project = require('../models/projectModel');
const AppError = require('../utils/appError');
const asyncCatch = require('../utils/asyncCatch');
const factory = require('./handlerFactory');

exports.createProject = asyncCatch(async (req, res, next) => {
  // Pass researchers according to front-end input
  if (!req.body.researchers || req.body.researchers == []) {
    researchers = [req.user.id];
  } else {
    researchers = req.body.researchers;
    if (!researchers.includes(req.user.id)) {
      researchers.push(req.user.id);
    }
  }
  // Create new user object
  const newProject = await Project.create({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    researchers: researchers,
    raters: req.body.raters,
  });

  // Send response
  res.status(201).json({
    status: 'success',
    data: { project: newProject },
  });
});

// Give an overview of users' projects, including researchers' name and usernames
exports.getProjects = asyncCatch(async (req, res, next) => {
  // First, check whether the user is rater, researcher, admin
  let projects;
  const role = req.user.role;
  const id = req.user.id;
  const query = {};
  // Firstly, we find the corresponding query according to their roles
  if (role === 'researcher' || role === 'rater') {
    query[role + 's'] = { $elemMatch: { $eq: id } };
  } else if (role == null || role != 'admin') {
    // Return error in case no role is found
    return next(
      new AppError(
        "Unable to identify the current user's role. Refuse to get projects.",
        401
      )
    );
  }
  // Next, display their own projects according to their roles
  projects = await Project.find(query).populate({
    path: 'researchers',
    select: 'name username',
  });

  res.status(200).json({
    status: 'success',
    projects: projects,
  });
});

// Returns a project with researchers' and raters' names and usernames
exports.getOneProject = factory.getOneDoc(Project, [
  {
    path: 'researchers',
    select: 'name username',
  },
  {
    path: 'raters',
    select: 'name username',
  },
]);

exports.deleteProject = factory.deleteOneDoc(Project);

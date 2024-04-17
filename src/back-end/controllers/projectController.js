const Project = require('../models/projectModel');
const asyncCatch = require('../utils/asyncCatch');

exports.createProject = asyncCatch(async (req, res, next) => {
  // Create new user object
  const newProject = await Project.create({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    researchers: [req.user.id],
  });

  // Send response
  res.status(201).json({
    status: 'success',
    data: { project: newProject },
  });
});

exports.getProjects = asyncCatch(async (req, res, next) => {
  const projects = await Project.find().populate({
    path: 'researchers',
    select: 'name username',
  });
  res.status(200).json({
    status: 'success',
    projects: projects,
  });
});

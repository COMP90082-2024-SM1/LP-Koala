
const Project = require('../models/projectModel');
const AppError = require('../utils/appError');
const asyncCatch = require('../utils/asyncCatch');
const factory = require('./handlerFactory');

// Give an overview of users' projects, including researchers' name and usernames
exports.getProjects = factory.getAllItems(Project);

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
  {
    path: 'modules',
    select: '-__v -projectId',
  },
]);
exports.createProject = factory.createOneItem(Project);
exports.deleteProject = factory.deleteOneDoc(Project);
exports.updateProject = factory.updateOneItem(Project);


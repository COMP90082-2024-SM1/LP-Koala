const express = require('express');
const projectController = require('../controllers/projectController');
const {
  restrictTo,
  protect,
  checkAccess,
} = require('../controllers/authController');
const Project = require('../models/projectModel');

const router = express.Router();

router.use(protect);

// Only researchers/raters can see their own projects, but admin can see all the projects
router.get('/', projectController.getProjects);

router.post(
  '/createProject',
  restrictTo('researcher'),
  projectController.createProject
);
router
  .route('/:id')
  .get(projectController.getOneProject)
  .delete(
    restrictTo('researcher'),
    checkAccess(Project),
    projectController.deleteProject
  )
  .post(
    restrictTo('researcher'),
    checkAccess(Project),
    projectController.updateProject
  );

module.exports = router;

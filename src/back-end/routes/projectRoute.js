const express = require('express');
const projectController = require('../controllers/projectController');
const {
  restricTo,
  protect,
  checkAccess,
} = require('../controllers/authController');
const Project = require('../models/projectModel');

const router = express.Router();

router.use(protect);

// Only researchers/raters can see their own projects, but admin can see all the projects
router.get('/', projectController.getProjects);

router
  .route('/:id')
  .get(projectController.getOneProject)
  .delete(
    restricTo('researcher'),
    checkAccess(Project),
    projectController.deleteProject
  )
  .post(
    restricTo('researcher'),
    checkAccess(Project),
    projectController.updateProject
  );

router.use(restricTo('researcher'));
router.post('/createProject', projectController.createProject);

module.exports = router;

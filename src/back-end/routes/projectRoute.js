const express = require('express');
const projectController = require('../controllers/projectController');
const { restricTo, protect } = require('../controllers/authController');

const router = express.Router();

router.use(protect);

// Only researchers/raters can see their own projects, but admin can see all the projects
router.get('/', projectController.getProjects);

router.use(restricTo('researcher'));
router.post('/createProject', projectController.createProject);
module.exports = router;

const express = require('express');
const projectController = require('../controllers/projectController');
const { restricTo, protect } = require('../controllers/authController');

const router = express.Router();

router.use(protect);
// TODO: Implement so that only researchers can see their own project,
//       but admin can see all the projects
router.get('/', projectController.getProjects);

router.use(restricTo('researcher'));
router.post('/createProject', projectController.createProject);
module.exports = router;

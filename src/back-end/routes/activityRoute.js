const express = require('express')
const multipleChoiceController = require('./../controllers/activityController');
const activityController = require('./../controllers/activityController')

const router = express.Router();

router.route('/mcq/choice').get(multipleChoiceController.getAllChoice).post(multipleChoiceController.createChoice)
router.route('/mcq/multipleChoiceQuestion').get(multipleChoiceController.getAllMcqQuestions).post(multipleChoiceController.createMcq)
router.route('/').get(activityController.getAllActivity).post(activityController.createActivity);
module.exports = router;
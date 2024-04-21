const express = require('express')
const multipleChoiceController = require('./../controllers/activityController');
const activityController = require('./../controllers/activityController')

const router = express.Router();

router.route('/mcq/choice')
    .get(multipleChoiceController.getAllChoice)
    .post(multipleChoiceController.createChoice);

router.route('/mcq/choice/:id')
    .delete(multipleChoiceController.deleteChoice)

router.route('/mcq/multipleChoiceQuestion')
    .get(multipleChoiceController.getAllMcqQuestions)
    .post(multipleChoiceController.createMcq);

router.route('/mcq/multipleChoiceQuestion/:id')
    .delete(multipleChoiceController.deleteMcq)

router.route('/shortAnswer')
    .get(activityController.getAllShortAnswerQuestions)
    .post(activityController.createShortAnswerQuestions);

router.route('/shortAnswer/:id')
    .delete(activityController.deleteShortAnswerQuestions)

router.route('/')
    .get(activityController.getAllActivity)
    .post(activityController.createActivity);

router.route('/')
    .delete(activityController.deleteActivity)

module.exports = router;
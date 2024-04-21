const catchAsync = require('./../utils/asyncCatch');
const {singleChoice, mcqQuestion} = require('./../models/multipleChoiceModel');
const shortAnswer = require('./../models/shortAnswerModel');
const activity = require('./../models/activityModel');
const factory = require('./activityHandler');
const multer = require('multer')


exports.getAllChoice = factory.getAll(singleChoice);
exports.getAllMcqQuestions = factory.getAll(mcqQuestion);
exports.getAllShortAnswerQuestions = factory.getAll(shortAnswer);
exports.getAllActivity = factory.getAll(activity);
exports.createChoice = factory.createOne(singleChoice);
exports.createMcq = factory.createOne(mcqQuestion);
exports.createShortAnswerQuestions = factory.createOne(shortAnswer);
exports.createActivity = factory.createOne(activity);
exports.deleteChoice = factory.deleteOne(singleChoice);
exports.deleteMcq = factory.deleteOne(mcqQuestion);
exports.deleteActivity = factory.deleteOne(activity);
exports.deleteShortAnswerQuestions = factory.deleteOne(shortAnswer);
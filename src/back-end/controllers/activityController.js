const catchAsync = require('./../utils/asyncCatch');
const {singleChoice, mcqQuestion} = require('./../models/multipleChoiceModel');
const factory = require('./activityHandler');


exports.getAllChoice = factory.getAll(singleChoice);
exports.getAllMcqQuestions = factory.getAll(mcqQuestion);
exports.createChoice = factory.createOne(singleChoice);
exports.createMcq = factory.createOne(mcqQuestion);
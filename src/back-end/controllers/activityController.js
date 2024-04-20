const catchAsync = require('./../utils/asyncCatch');
const {singleChoice, mcqQuestion} = require('./../models/multipleChoiceModel');
const activity = require('./../models/activityModel');
const factory = require('./activityHandler');


exports.getAllChoice = factory.getAll(singleChoice);
exports.getAllMcqQuestions = factory.getAll(mcqQuestion);
exports.getAllActivity = factory.getAll(activity);
exports.createChoice = factory.createOne(singleChoice);
exports.createMcq = factory.createOne(mcqQuestion);
exports.createActivity = factory.createOne(activity);
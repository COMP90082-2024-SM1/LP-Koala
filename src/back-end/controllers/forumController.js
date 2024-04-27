const catchAsync = require('./../utils/asyncCatch');
const Forum = require('./../models/forumModels/forumModel');
const Post = require('./../models/forumModels/postModel');
const Thread = require('./../models/forumModels/threadModel');
const Respond = require('./../models/forumModels/respondModel');
const factory = require('./activityHandler');

exports.getAllForums = factory.getAll(Forum);
exports.getAllPosts = factory.getAll(Post);
exports.getAllThreads = factory.getAll(Thread);
exports.getAllResponds = factory.getAll(Respond);

exports.createOneForum = factory.createOne(Forum);
exports.createOnePost = factory.createOne(Post);
exports.createOneThread = factory.createOne(Thread);
exports.createOneRespond = factory.createOne(Respond);

exports.getOneForum = factory.getOne(Forum);
exports.getOnePost = factory.getOne(Post);
exports.getOneThread = factory.getOne(Thread);
exports.getOneActivity = factory.getOne(Respond);

exports.deleteOneForum = factory.deleteOne(Forum);
exports.deleteOnePost = factory.deleteOne(Post);
exports.deleteOneThread = factory.deleteOne(Thread);
exports.deleteOneRespond = factory.deleteOne(Respond);

const catchAsync = require('./../utils/asyncCatch');
const Forum = require('./../models/forumModels/forumModel');
const Post = require('./../models/forumModels/postModel');
const Thread = require('./../models/forumModels/threadModel');
const Respond = require('./../models/forumModels/respondModel');
const Project = require('./../models/projectModel');
const factory = require('./activityHandler');

exports.getAllForums = factory.getAll(Forum);
exports.getAllPosts = factory.getAll(Post);
exports.getAllThreads = factory.getAll(Thread);
exports.getAllResponds = factory.getAll(Respond);

exports.createOneForum = catchAsync(async (req, res, next) => {
  const result = await Forum.create(req.body);
  // update the corresponding project reference
  await Project.findByIdAndUpdate(
    req.params.projectId,
    { forum: result.id },
    { new: true, runValidators: true }
  );
  res.status(201).json({
    status: 'success',
    data: {
      data: result,
    },
  });
});

exports.createOnePost = factory.createOne(Post);
exports.createOneThread = factory.createOne(Thread);
exports.createOneRespond = factory.createOne(Respond);

exports.getOneForum = factory.getOne(Forum);
exports.getOnePost = factory.getOne(Post);
exports.getOneThread = factory.getOne(Thread);
exports.getOneRespond = factory.getOne(Respond);

exports.deleteOneForum = factory.deleteOne(Forum);
exports.deleteOnePost = factory.deleteOne(Post);
exports.deleteOneThread = factory.deleteOne(Thread);
exports.deleteOneRespond = factory.deleteOne(Respond);

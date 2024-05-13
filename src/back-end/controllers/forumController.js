const Forum = require('./../models/forumModels/forumModel');
const Post = require('./../models/forumModels/postModel');
const Thread = require('./../models/forumModels/threadModel');
const Respond = require('./../models/forumModels/respondModel');
const Project = require('./../models/projectModel');
const factory = require('./activityHandler');
const asyncCatch = require('./../utils/asyncCatch');
const AppError = require('./../utils/appError');

const createChild = (Model) =>
  asyncCatch(async (req, res, next) => {
    let parent;
    if (Model.modelName === 'Thread') {
      parent = await Forum.findById(req.params.id);
    } else if (Model.modelName === 'Post') {
      parent = await Thread.findById(req.params.id);
    } else if (Model.modelName === 'Respond') {
      parent = await Post.findById(req.params.id);
    }
    if (!parent) {
      return next(
        new AppError('No such parent document found with given ID', 404)
      );
    }
    const newInstance = await Model.create(req.body);
    parent[Model.modelName.toLowerCase() + 's'].push(newInstance._id);
    parent.save();

    res.status(201).json({
      status: 'success',
      data: {
        data: newInstance,
      },
    });
  });

exports.getAllForums = factory.getAll(Forum);
exports.getAllPosts = factory.getAll(Post);
exports.getAllThreads = factory.getAll(Thread);
exports.getAllResponds = factory.getAll(Respond);

exports.createOneForum = asyncCatch(async (req, res, next) => {
  const result = await Forum.create(req.body);
  // update the corresponding project reference
  console.log(req.params.projectId);
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

exports.createOnePost = createChild(Post);
exports.createOneThread = createChild(Thread);
exports.createOneRespond = createChild(Respond);

exports.getOneForum = factory.getOne(Forum);
exports.getOnePost = factory.getOne(Post);
exports.getOneThread = factory.getOne(Thread);
exports.getOneRespond = factory.getOne(Respond);

exports.deleteOneForum = factory.deleteOne(Forum);
exports.deleteOnePost = factory.deleteOne(Post);
exports.deleteOneThread = factory.deleteOne(Thread);
exports.deleteOneRespond = factory.deleteOne(Respond);

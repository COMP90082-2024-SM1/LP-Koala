const Forum = require('./../models/forumModels/forumModel');
const Post = require('./../models/forumModels/postModel');
const Thread = require('./../models/forumModels/threadModel');
const Respond = require('./../models/forumModels/respondModel');
const Project = require('./../models/projectModel');
const factory = require('./activityHandler');
const asyncCatch = require('./../utils/asyncCatch');
const AppError = require('./../utils/appError');
const mongoose = require('mongoose');

const isDescendent = async (rootId, descendantType, descendantId) => {
  const aggconfig = [
    { $match: { _id: rootId } },
    // Lookup Threads
    {
      $lookup: {
        from: 'threads',
        localField: 'threads',
        foreignField: '_id',
        as: 'threads',
      },
    },
  ];
  console.log(descendantType);
  console.log(rootId);
  console.log(descendantId);
  if (descendantType === 'thread') {
    aggconfig.push({ $match: { 'threads._id': descendantId } });
  } else if (descendantType === 'post') {
    aggconfig.push(
      ...[
        { $unwind: '$threads' },
        {
          $lookup: {
            from: 'posts',
            localField: 'threads.posts',
            foreignField: '_id',
            as: 'posts',
          },
        },
        { $match: { 'posts._id': descendantId } },
      ]
    );
  } else if (descendantType === 'respond') {
    aggconfig.push(
      ...[
        { $unwind: '$threads' },
        {
          $lookup: {
            from: 'posts',
            localField: 'threads.posts',
            foreignField: '_id',
            as: 'posts',
          },
        },
        { $unwind: '$posts' },
        { $match: { 'posts.responds': descendantId } },
      ]
    );
  } else {
    return false;
  }
  aggconfig.push(
    ...[{ $project: { _id: 1, exists: { $literal: true } } }, { $limit: 1 }]
  );
  console.log(aggconfig);
  const result = await Forum.aggregate(aggconfig);
  console.log(result);
  if (result.length === 0) {
    console.log(`Instance is not in the given grandparent`);
    return false;
  } else {
    console.log(`Instance is in the given grandparent`);
    return true;
  }
};
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
    req.body.user = req.user.id;
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

exports.checkDescendant = (Model) =>
  asyncCatch(async (req, res, next) => {
    const rootProject = await Project.findById(req.params.projectId);
    if (Model.modelName === 'Forum') {
      if (req.params.id != rootProject.forum) {
        return next(
          new AppError("This project doesn't have this document", 404)
        );
      }
      next();
    } else {
      const forumID = rootProject.forum;
      const descendantId = new mongoose.Types.ObjectId(req.params.id);
      const result = await isDescendent(
        forumID,
        Model.modelName.toLowerCase(),
        descendantId
      );
      if (!result) {
        return next(
          new AppError("This project doesn't have this document", 404)
        );
      }
      next();
    }
  });

exports.getAllForums = factory.getAll(Forum);
exports.getAllPosts = factory.getAll(Post);
exports.getAllThreads = factory.getAll(Thread);
exports.getAllResponds = factory.getAll(Respond);

exports.createOneForum = asyncCatch(async (req, res, next) => {
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

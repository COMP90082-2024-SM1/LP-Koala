const express = require('express');
const forumController = require('./../controllers/forumController');
const Respond = require('../models/forumModels/respondModel');
const Post = require('../models/forumModels/postModel');
const Thread = require('../models/forumModels/threadModel');
const Forum = require('../models/forumModels/forumModel');
const router = express.Router({ mergeParams: true });

router.route('/').post(forumController.createOneForum);

// router.route('/threads/').get(forumController.getAllThreads);

// router.route('/threads/posts/').get(forumController.getAllPosts);

// router.route('/threads/posts/responds/').get(forumController.getAllResponds);

router
  .route('/threads/posts/responds/:id')
  .get(forumController.checkDescendant(Respond), forumController.getOneRespond)
  .delete(
    forumController.checkDescendant(Respond),
    forumController.deleteOneRespond
  );
router
  .route('/threads/posts/:id')
  .get(forumController.checkDescendant(Post), forumController.getOnePost)
  .delete(forumController.checkDescendant(Post), forumController.deleteOnePost)
  .post(
    forumController.checkDescendant(Post),
    forumController.createOneRespond
  );

router
  .route('/threads/:id')
  .get(forumController.checkDescendant(Thread), forumController.getOneThread)
  .delete(
    forumController.checkDescendant(Thread),
    forumController.deleteOneThread
  )
  .post(forumController.checkDescendant(Thread), forumController.createOnePost);
router
  .route('/:id')
  .get(forumController.checkDescendant(Forum), forumController.getOneForum)
  .delete(
    forumController.checkDescendant(Forum),
    forumController.deleteOneForum
  )
  .post(
    forumController.checkDescendant(Forum),
    forumController.createOneThread
  );

module.exports = router;

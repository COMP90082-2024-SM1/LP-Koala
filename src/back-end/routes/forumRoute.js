const express = require('express');
const forumController = require('./../controllers/forumController');
const {
  protect,
  restrictTo,
  checkAccess,
} = require('../controllers/authController');
const Module = require('../models/moduleModel');

const router = express.Router();
router.use(protect);

router
  .route('/')
  .get(forumController.getAllForums)
  .post(forumController.createForum);

router
  .route('/threads/')
  .get(forumController.getAllThreads)
  .post(forumController.createThread);

router
  .route('/threads/posts/')
  .get(forumController.getAllPosts)
  .post(forumController.createPost);

router
  .route('/threads/posts/responds/')
  .get(forumController.getAllResponds)
  .post(forumController.createRespond);

router
  .route('/threads/posts/responds/:id')
  .get(forumController.getOneRespond)
  .delete(forumController.deleteOneRespond);

router
  .route('/threads/posts/:id')
  .get(forumController.getOnePost)
  .delete(forumController.deleteOnePost);

router
  .route('/threads/:id')
  .get(forumController.getOneThread)
  .delete(forumController.deleteOneThread);
router
  .route('/:id')
  .get(forumController.getOneForum)
  .delete(forumController.deleteOneForum);

module.exports = router;

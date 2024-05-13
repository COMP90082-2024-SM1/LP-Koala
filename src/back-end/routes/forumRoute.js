const express = require('express');
const forumController = require('./../controllers/forumController');
const {
  protect,
  restrictTo,
  checkAccess,
} = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(forumController.getAllForums)
  .post(forumController.createOneForum);

router.route('/threads/').get(forumController.getAllThreads);

router.route('/threads/posts/').get(forumController.getAllPosts);

router.route('/threads/posts/responds/').get(forumController.getAllResponds);

router
  .route('/threads/posts/responds/:id')
  .get(forumController.getOneRespond)
  .delete(forumController.deleteOneRespond);
router
  .route('/threads/posts/:id')
  .get(forumController.getOnePost)
  .delete(forumController.deleteOnePost)
  .post(forumController.createOneRespond);

router
  .route('/threads/:id')
  .get(forumController.getOneThread)
  .delete(forumController.deleteOneThread)
  .post(forumController.createOnePost);
router
  .route('/:id')
  .get(forumController.getOneForum)
  .delete(forumController.deleteOneForum)
  .post(forumController.createOneThread);

module.exports = router;

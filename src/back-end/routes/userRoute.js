const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', authController.login);

router.use(authController.protect);

router.post(
  '/createUser',
  authController.restricTo('admin'),
  userController.createUser
);

router.patch('/updateMyPassword', authController.updatePassword);
router.patch('/updateName', userController.updateName);

module.exports = router;

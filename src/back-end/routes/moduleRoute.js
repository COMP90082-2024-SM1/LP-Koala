const express = require('express');
const {
  getModules,
  createModule,
  getOneModule,
  deleteModule,
  updateModule,
} = require('../controllers/moduleController');
const {
  protect,
  restrictTo,
  checkAccess,
} = require('../controllers/authController');
const Module = require('../models/moduleModel');

const router = express.Router();

router.use(protect);

router.get('/', getModules);

router.post('/createModule', restrictTo('researcher'), createModule);

router
  .route('/:id')
  .get(checkAccess(Module), getOneModule)
  .delete(restrictTo('researcher'), checkAccess(Module), deleteModule)
  .post(restrictTo('researcher'), checkAccess(Module), updateModule);

module.exports = router;

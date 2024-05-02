const Module = require('../models/moduleModel');
const factory = require('./handlerFactory');
const Project = require('../models/projectModel');
const asyncCatch = require('../utils/asyncCatch');

exports.getModules = factory.getAllItems(Module);
exports.getOneModule = factory.getOneDoc(Module, [
    {
      path: 'activities',
}]);
exports.createModule = asyncCatch(async (req, res, next) => {
  // Pass researchers according to front-end input
  if (!req.body.researchers || req.body.researchers == []) {
    req.body.researchers = [req.user.id];
  } else {
    if (!req.body.researchers.includes(req.user.id)) {
      req.body.researchers.push(req.user.id);
    }
  }
  // Create new Model
  const item = await Module.create(req.body);

  // update the corresponding project reference
  await Project.findByIdAndUpdate(
    item.projectId,
    { $push: { modules: item.id } },
    { new: true, runValidators: true }
  );
  // Send response
  res.status(201).json({
    status: 'success',
    data: item,
  });
});
exports.deleteModule = factory.deleteOneDoc(Module);
exports.updateModule = factory.updateOneItem(Module);

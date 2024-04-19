const Module = require('../models/moduleModel');
const factory = require('./handlerFactory');

exports.getModules = factory.getAllItems(Module);
exports.getOneModule = factory.getOneDoc(Module);
exports.createModule = factory.createOneItem(Module);
exports.deleteModule = factory.deleteOneDoc(Module);
exports.updateModule = factory.updateOneItem(Module);

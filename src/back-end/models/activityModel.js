const mongoose = require('mongoose');
const Item = require('./itemModel');

const moduleSchme = new Item({
  title: {
    type: String,
    required: true,
  },
});

const Module = mongoose.Model('Module', moduleSchme);

module.exports = Module;

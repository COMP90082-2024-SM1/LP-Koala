const mongoose = require('mongoose');
const Item = require('./itemModel');

const moduleSchme = new Item({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  activities: {
    type: mongoose.Schema.ObjectId,
    ref: 'Activity',
  },
});

const Module = mongoose.model('Module', moduleSchme);

module.exports = Module;

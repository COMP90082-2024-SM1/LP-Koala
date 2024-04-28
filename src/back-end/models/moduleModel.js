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
  accessTime: {
    type: Date,
  },
  accessable: {
    type: Boolean,
    default: true,
  },
  projectId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: true,
  },
    activities: {
      type: [mongoose.Schema.ObjectId],
      ref: 'activity',
    },
});

const Module = mongoose.model('Module', moduleSchme);

module.exports = Module;

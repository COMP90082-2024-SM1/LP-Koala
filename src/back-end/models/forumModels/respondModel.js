const mongoose = require('mongoose');

const respondSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'A respond must have content'],
  },
});

const respondModel = mongoose.model('respond', respondSchema);

module.exports = respondModel;

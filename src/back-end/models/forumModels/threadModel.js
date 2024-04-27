const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A thread must have a title'],
  },
  description: {
    type: String,
    required: [true, 'A thread must have a general description'],
  },
  posts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'post',
    },
  ],
});

threadSchema.pre(/^find/, function (next) {
  this.populate('posts');
});

const threadModel = mongoose.model('thread', threadSchema);

module.exports = threadModel;

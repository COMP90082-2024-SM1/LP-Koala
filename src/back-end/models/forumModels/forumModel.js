const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'A forum must have a general description'],
  },
  threads: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Thread',
    },
  ],
});

forumSchema.pre(/^find/, function (next) {
  this.populate('threads');
  next();
});

const Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'A post must have content'],
  },
  responds: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'respond',
    },
  ],
});

postSchema.pre(/^find/, function (next) {
  this.populate('responds');
});

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;

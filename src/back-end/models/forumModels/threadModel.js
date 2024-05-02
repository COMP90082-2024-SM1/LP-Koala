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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async function (id) {
        const user = await User.findById(id);
        return Boolean(user);
      },
      message: 'Error: No user information',
    },
  },
  posts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'post',
    },
  ],
  creatAt: Date,
});

threadSchema.pre(/^find/, function (next) {
  this.populate('posts');
  next();
});

threadSchema.pre('save', function (next) {
  if (this.isNew) {
    this.creatAt = Date.now();
  }

  next();
});

const threadModel = mongoose.model('thread', threadSchema);

module.exports = threadModel;

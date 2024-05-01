const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'A post must have content'],
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
  responds: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'respond',
    },
  ],
  creatAt: Date,
});

postSchema.pre(/^find/, function (next) {
  this.populate('responds');
  next();
});

postSchema.pre('save', function (next) {
  if (this.isNew) {
    this.creatAt = Date.now();
  }
  next();
});

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;

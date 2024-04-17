const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter project title here.'],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  researchers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  raters: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  // TODO: Reference module modules here
});
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

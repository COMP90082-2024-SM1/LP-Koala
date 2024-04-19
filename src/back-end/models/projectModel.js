const mongoose = require('mongoose');
const Item = require('./itemModel');

const projectSchema = new Item({
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
  // TODO: Reference module modules here
});
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

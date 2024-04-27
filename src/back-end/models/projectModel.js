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
<<<<<<< HEAD
  // modules: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Module',
  // },
=======
  modules: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Module',
    },
  ],
>>>>>>> backend
});
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

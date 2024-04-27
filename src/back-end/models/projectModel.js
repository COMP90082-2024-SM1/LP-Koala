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
  modules: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Module',
    },
  ],
=======
  // modules: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Module',
  // },
>>>>>>> 2d0f1f45186af4d87ef9d46e91858e97dcef130f
});
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

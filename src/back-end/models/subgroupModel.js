const mongoose = require('mongoose');
const User = require('./userModel');

const subgroupSchema = new mongoose.Schema({
  raters: {
    type: [User],
    required: [true, 'Please provide raters for creating a subgroup.'],
  },
});

const Subgroup = new mongoose.Model('Subgroup', subgroupSchema);

module.exports = Subgroup;

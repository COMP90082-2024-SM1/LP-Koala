const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    description:{
        type: String,
        required: [true, 'An activity must have a general description']
    },
    multipleChoiceQuestions:[{
        type: mongoose.Schema.ObjectId,
        ref: 'multipleChoices'
    }]
});

activitySchema.pre(/^find/, function(next) {
    this.populate('multipleChoiceQuestions');
    next();
})

const activityModel = mongoose.model('activity', activitySchema);

module.exports = activityModel;
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    description:{
        type: String,
        required: [true, 'An activity must have a general description']
    },
    multipleChoiceQuestions:[{
        type: mongoose.Schema.ObjectId,
        ref: 'multipleChoices'
    }],
    shortAnswerQuestions:[{
        type: mongoose.Schema.ObjectId,
        ref: 'shortAnswer'
    }],
    files : [{
        type: mongoose.Schema.ObjectId,
        ref: 'fileModel'
    }]
});

activitySchema.pre(/^find/, function(next) {
    this.populate('multipleChoiceQuestions');
    this.populate('shortAnswerQuestions');
    this.populate('files');
    next();
})

const activityModel = mongoose.model('activity', activitySchema);

module.exports = activityModel;
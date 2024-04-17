const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema( {
    name:{
        type: String,
        required: [true, "Please enter name here."],
    },
    createdAt: {
        type: Date,
        required: [true],
        // TODO: time zone or use timestamp?
        default: Date.now()
    },
    createdBy: {
        type: {
            // TODO: or use username here?
            name: {
                type: String,
                required: [true, "Please enter name here."],
            },
            role: {
                type: String,
                enum: ["rater", "researcher", "admin"],
                default: "rater",
            },
        }
    },
    raters: {
        type: [{
            // TODO: or use username here?
            name: {
                type: String,
                required: [true, "Please enter name here."],
            },
            role: {
                type: String,
                enum: ["rater", "researcher", "admin"],
                default: "rater",
            },
        }]
    },
    // modules: {
    //
    // },
})
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
const Project = require("../models/projectModel");
const asyncCatch = require("../utils/asyncCatch");

exports.createProject = asyncCatch(async (req, res, next) => {
    // Create new user object
    console.log(req.body);
    const newProject = await Project.create({
        name: req.body.name,

    });

    // Send response
    res.status(201).json({
        status: "success",
        data: { project: newProject },
    });
});

exports.getProjects = asyncCatch(async (req, res, next) => {

    const projects = await Project.find()
    res.status(200).json({
        status: "success",
        projects: projects
    })
})

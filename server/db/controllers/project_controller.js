const Project = require('../models/project_model');

exports.get_by_id = async (req,res) => {
    try
    {
        let id = Number.parseInt(req.params.project_id);
        if (id === NaN)
            throw new Error('Invalid id.');
        res.status(200).json(await Project.get_by_id(id));
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.create = async (req,res) => {
    try
    {
        res.status(200).json(await Project.create(new Project(req.body)));
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.update_by_id = async (req,res) => {
    try
    {
        let id = Number.parseInt(req.params.project_id);
        if (id === NaN)
            throw new Error('Invalid provided.');
        res.status(200).json(await Project.update_by_id(id,new Project(req.body)));
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.delete_by_id = async (req,res) => {
    try
    {
        let id = Number.parseInt(req.params.project_id);
        if (id === NaN)
            throw new Error('Invalid provided.');
        res.status(200).json(await Project.remove_by_id(id));
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}
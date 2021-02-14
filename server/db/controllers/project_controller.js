const Project = require('../models/project_model');
const Worker = require('../models/worker_model');
const {isNaN} = Number;
exports.get_by_id = async (req,res) => {
    try
    {
        let id = Number.parseInt(req.params.project_id);
        if (isNaN(id))
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
    let new_project = new Project(req.body);
    try
    {
        new_project.id = await new_project.save();

        let new_worker = new Worker({
            user_id: req.user.id,
            project_id: new_project.id,
            role: 0,
        });
        new_worker.id = await new_worker.save();
        
        
        res.status(200).json({
            new_project,
            new_worker
        });
    }
    catch(err)
    {
        console.log(err);
        if (new_project.id)
            Project.remove_by_id(new_project.id);
        res.status(500).json(err);
    }
}

exports.update_by_id = async (req,res) => {
    try
    {
        let id = Number.parseInt(req.params.project_id);
        if (isNaN(id))
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
        if (isNaN(id))
            throw new Error('Invalid provided.');
        res.status(200).json(await Project.remove_by_id(id));
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}
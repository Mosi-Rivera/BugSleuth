const Ticket = require('../models/ticket_model');
const Worker = require('../models/worker_model');
const TicketComment = require('../models/ticket_comment_model');
const {isNaN} = Number;
exports.set_assigned_worker = async (req,res) => {
    try
    {
        let project_id = Number.parseInt(req.body.project_id);
        let ticket_id = Number.parseInt(req.body.ticket_id);
        let worker_id = Number.parseInt(req.body.worker_id);
        if (isNaN(project_id) || isNaN(ticket_id) || isNaN(worker_id))
            throw new Error('Invalid project or ticket id.');
        let worker = await Worker.get_match({
            id: worker_id,
            project_id
        })[0];
        if (!worker)
            throw new Error('Invalid worker.');
        await Ticket.update_by_id(ticket_id,{assigned_to: worker_id});
        res.status(200).send('Ticket assigned to worker: ' + worker_id);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.get_by_project = async (req,res) => {
    try
    {
        let project_id = Number.parseInt(req.params.project_id);
        if (isNaN(project_id))
            throw new Error('Invalid id.');
        let worker = res.locals.worker;
        if (!worker || worker.role > 1)
            throw new Error('Unauthorized.');
        let query = req.query;
        query.project_id = project_id;
        res.status(200).json(await Ticket.get_match(query));
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.get_by_assigned_user = async (req,res) => {
    try
    {
        let worker_id = Number.parseInt(req.params.worker_id);
        if (isNaN(worker_id))
            throw new Error('Invalid id.');
        let query = req.query;
        query.assigned_to = worker_id;
        res.satus(200).json(await Ticket.get_match({assigned_to: worker_id}));
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.get_match = async (req,res) => {
    try
    {
        res.status(200).json(await Ticket.get_match(req.query));
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.list_all = async (req,res) => {
    try
    {
        res.status(200).json(await Ticket.get_all());
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.create_comment = async (req,res) => {
    try
    {
        let new_comment = new TicketComment(req.body,res.locals.worker.id);
        new_comment.id = await new_comment.save();
        res.status(200).json(new_comment);
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
        const worker = (await Worker.get_match({user_id: req.user.id,project_id: req.body.project_id}))[0];
        if (
            !worker ||
            worker.role > 3
        )
            throw new Error('Unauthorized');
        const new_ticket = new Ticket(req.body,req.user.id);
        new_ticket.id = await new_ticket.save();
        res.status(200).json(new_ticket);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.get_by_id = async (req,res) => {
    try
    {
        const id = req.params.ticket_id;
        if (!id)
            throw new Error('No id provided.');
        res.status(200).json(await Ticket.get_by_id(id));
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
        const id = req.params.ticket_id;
        if (!id)
            throw new Error('No id provided.');
        await Ticket.update_by_id(id,res.locals.worker.id,req.body)
        res.status(200).send('Updated.');
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
        const id = req.params.ticket_id;
        if (!id)
            throw new Error('No id provided.');
        res.status(200).json(await Ticket.remove_by_id(id));
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}
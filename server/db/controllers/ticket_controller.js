const Ticket = require('../models/ticket_model');

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

exports.create = async (req,res) => {
    try
    {
        res.status(200).json(await Ticket.create(new Ticket(req.body)));
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
        res.status(200).json(await Ticket.update_by_id(id,req.body));
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
const sql = require('./db');

class Ticket
{
    constructor(ticket)
    {
        this.project_id = ticket.project_id;
        this.task = ticket.task;
        this.description = ticket.description;
        this.severity = ticket.severity;
        this.status = ticket.status;
        this.assigned_to = ticket.assigned_to;
    }

    static create(obj)
    {
        return new Promise((resolve,reject) => sql.query(
            'INSERT INTO ticket set ?;',
            obj,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result.insertId);
            }
        ))
    }

    static get_all()
    {
        return new Promise((resolve,reject) => sql.query(
            'SELECT * IN tickets;',
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            }
        ))
    }

    static get_by_id(id)
    {
        return new Promise((resolve,reject) => sql.query(
            'SELECT ticket IN tickets WHERE id = ?;',
            id,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            }
        ))
    }

    static update_by_id(id,obj)
    {
        return new Promise((resolve,reject) => sql.query(
            'UPDATE ticket SET ? WHERE id = ?;',
            [obj,id],
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            }
        ))
    }

    static remove_by_id(id)
    {
        return new Promise((resolve,reject) => sql.query(
            'DELETE FROM tickets WHERE id == ?;',
            id,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            }
        ))
    }
};

module.exports = Ticket;
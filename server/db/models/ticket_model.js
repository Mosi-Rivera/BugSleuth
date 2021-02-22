const sql = require('./db');
const {join_obj_query_by} = require('../helpers/query');
const TicketHistory = require('./ticket_history_model');
const valid_queries = [
    'project_id',
    'task',
    'description',
    'severity',
    'status',
    'submitted_by',
    'assigned_to',
]
class Ticket
{
    constructor(ticket,id)
    {
        this.project_id = ticket.project_id;
        this.task = ticket.task;
        this.description = ticket.description;
        this.severity = ticket.severity;
        this.status = ticket.status;
        this.submitted_by = id;
        this.assigned_to = ticket.assigned_to;
    }

    save()
    {
        return Ticket.create(this);
    }

    static get_by_assigned_user(id)
    {
        return new Promise((resolve,reject) => sql.query(
            'SELECT * FROM ticket WHERE assigned_to = ?;',
            id,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            }
        ));
    }

    static get_by_project(id)
    {
        return new Promise((resolve,reject) => sql.query(
            'SELECT * FROM ticket WHERE project_id = ?;',
            id,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            }
        ))
    }

    static get_match(obj)
    {
        return new Promise((resolve,reject) => sql.query(
            'SELECT * FROM ticket WHERE ' + join_obj_query_by('and',obj,valid_queries),
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            }
        ))
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
            'SELECT * FROM ticket WHERE id = ?;',
            id,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result[0]);
            }
        ))
    }

    static update_by_id(id,user_id,obj)
    {
        return Ticket.get_by_id(id).then(
            original => {
                console.log(original);
                if (!original)
                    throw new Error('Invalid id.');
                return new Promise((resolve,reject) => sql.query(
                    'UPDATE ticket SET ? WHERE id = ?;',
                    [obj,id],
                    (err,result) => {
                        if (err)
                            return reject(err);
                        TicketHistory.create_many(original,obj,id,user_id);
                        return resolve(result);
                    }
                ));
            }
        )
        .catch(err => Promise.reject(err));
    }

    static remove_by_id(id)
    {
        return new Promise((resolve,reject) => sql.query(
            'DELETE FROM tickets WHERE id = ?;',
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
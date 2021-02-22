const sql = require('./db');

class TicketHistory
{
    constructor(history)
    {
        this.ticket_id  = history.ticket_id;
        this.user_id    = history.user_id;
        this.field      = history.field;
        this.from_value = history.from_value;
        this.to_value   = history.to_value;
    }

    save()
    {
        return TicketHistory.create(this);
    }

    static get_all_by_id(id)
    {
        return new Promise((resolve,reject) => sql.query(
            'SELECT user.email, ticket_history.from_value, ticket_history.to_value, ticket_history.created, ticket_history.field FROM ticket_history JOIN worker ON ticket_history.user_id = worker.id JOIN user ON worker.user_id = user.id WHERE ticket_id = ?;',
            id,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            }
        ));
    }

    static create_many(original,obj,ticket_id,user_id)
    {
        let keys = Object.keys(obj);
        for (let i = keys.length; i--;)
        {
            let key = keys[i];
            TicketHistory.create({
                ticket_id,
                user_id,
                field: key,
                from_value: original[key],
                to_value: obj[key]
            });
        }
    }

    static create(obj)
    {
        return new Promise((resolve,reject) => sql.query(
            'INSERT INTO ticket_history SET ?;',
            obj,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result.insertId);
            }
        ));
    }
}

module.exports = TicketHistory;
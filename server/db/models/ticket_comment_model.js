const sql = require('./db');

class TicketComment
{
    constructor(comment,id)
    {
        this.commenter_id = id;
        this.ticket_id = comment.ticket_id;
        this.message = comment.message;
    }

    save()
    {
        return TicketComment.create(this);
    }

    static get_all_by_id(id)
    {
        return new Promise((resolve,reject) => sql.query(
            'SELECT *  FROM ticket_comment WHERE ticket_id = ?;',
            id,
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
            'INSERT INTO ticket_comment  SET ?;',
            obj,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result.insertId);
            }
        ))
    }
}

module.exports = TicketComment;
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
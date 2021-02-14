const sql = require('./db');
const {join_obj_query_by} = require('../helpers/query');
const valid_queries = [
    'user_id',
    'project_id',
    'id',
    'role'
];
class Worker
{
    constructor(worker)
    {
        this.user_id = worker.user_id;
        this.project_id = worker.project_id;
        this.role = worker.role;
    }

    save()
    {
        return Worker.create(this);
    }

    static create(obj)
    {
        return new Promise((resolve,reject) => sql.query(
            'INSERT INTO worker set ?;',
            obj,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result.insertId);
            }
        ))
    }

    static get_match(obj)
    {
        return new Promise((resolve,reject) => sql.query(
            'SELECT * FROM worker WHERE ' + join_obj_query_by('and',obj,valid_queries),
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
            'SELECT * FROM worker WHERE id = ?;',
            id,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result[0]);
            }
        ))
    }
}

module.exports = Worker;
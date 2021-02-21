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

    static get_by_email_in_project(email,project_id)
    {
        return new Promise((resolve,reject) => sql.query(
            'SELECT COUNT(*) FROM worker WHERE project_id = ?, user_id IN (SELECT user.id FROM user WHERE email = ?);',
            [project_id,email],
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result.insertId);
            }
        ))
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

    static set_role_by_id(id,role)
    {
        return new Promise((resolve,reject) => sql.query(
            'INSERT INTO worker set role = ? where id = ?;',
            [role,id],
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            }
        ))
    }

    static delete_by_id()
    {
        return new Promise((resolve,reject) => sql.query(
            'DELETE FROM worker WHERE id = ?;',
            id,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            }
        ))
    }

    static get_by_project_id(id)
    {
        return new Promise((resolve,reject) => sql.query(
            'SELECT worker.id, role, username, email FROM worker INNER JOIN user ON worker.user_id = user.id WHERE project_id = ?;',
            id,
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
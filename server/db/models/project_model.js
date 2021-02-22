const sql = require('./db');

class Project
{
    constructor(project)
    {
        this.title = project.title;
        this.info = project.info;
        this.status = project.status;
    }

    save()
    {
        return Project.create(this);
    }

    static get_user_projects(id)
    {
        return new Promise((resolve,reject) => sql.query(
            'SELECT project.id, project.status, project.title, project.info, worker.role FROM project JOIN worker ON project.id = worker.project_id AND worker.user_id = ? WHERE project.id IN (SELECT worker.project_id FROM worker WHERE user_id = ?);',
            [id,id],
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            }
        ))
    }

    static create(project)
    {
        return new Promise((resolve,reject) => sql.query(
            'INSERT INTO project set ?;',
            project,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result.insertId);
            }
        ))
    }
    static get_by_id(id)
    {
        return new Promise((resolve,reject) => sql.query(
            'SELECT * FROM project WHERE id = ?;',
            id,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result[0]);
            }
        ))
    }
    static update_by_id(id,project)
    {
        return new Promise((resolve,reject) => sql.query(
            'UPDATE project SET project = ? WHERE id = ?;',
            [project,id],
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
            'DELETE FROM project WHERE id = ?;',
            id,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            }
        ))
    }
}

module.exports = Project;
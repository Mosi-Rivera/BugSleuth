const sql = require('./db');

class User
{
    constructor(user)
    {
        this.email = user.email;
        this.password = user.password;
        this.username = user.username;
    }

    save()
    {
        return new Promise((resolve,reject) => sql.query(
            'INSERT INTO user set ?;',
            this,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result.insertId);
            }
        ));
    }

    static get_match(match)
    {
        return new Promise((resolve,reject) => sql.query(
            'SELECT * FROM user WHERE ?;',
            match,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            }
        ));
    }

    static create()
    {
        return new Promise((resolve,reject) => sql.query(
            'INSERT INTO user set ?;',
            newUser,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result.isertId);
            }
        ));
    }
}

module.exports = User;
const sql = require('./db');
const {join_obj_query_by} = require('../helpers/query');
const valid_queries = [
    'email',
    'password',
    'username',
    'enabled',
];
class User
{
    constructor(user)
    {
        this.email = user.email;
        this.password = user.password;
        this.username = user.username;
        this.confirmation_code = user.confirmation_code;
    }

    save()
    {
        return User.create(this);
    }

    static set_confirmation_code(email,confirmation_code){
        return new Promise((resolve,reject) => sql.query(
            'UPDATE user SET confirmation_code = ? WHERE email = ?;',
            [confirmation_code,email],
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            }
        ))
    }

    static confirm_email_and_activate(email,password)
    {
        return new Promise((resolve,reject) => sql.query(
            'UPDATE user SET password = ?, confirmed_email = 1 WHERE email = ?',
            [password,email],
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            }
        ))
    }

    static confirm_email(email)
    {
        return new Promise((resolve,reject) => sql.query(
            'UPDATE user SET confirmed_email = 1 WHERE email = ?',
            email,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            }
        ))
    }

    static activate(email,password)
    {
        return new Promise((resolve,reject) => sql.query(
            'UPDATE user SET password = ? WHERE email = ?',
            [password,email],
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            }
        ))
    }

    static get_by_email(email)
    {
        return new Promise((resolve,reject) => sql.query(
            'SELECT * FROM user WHERE email = ?',
            email,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result[0]);
            }
        ))
    }

    static get_by_id(id)
    {
        return new Promise((resolve,reject) => sql.query(
            'SELECT * FROM user WHERE id = ?',
            id,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result[0]);
            }
        ))
    }

    static get_match(obj)
    {
        return new Promise((resolve,reject) => sql.query(
            'SELECT * FROM user WHERE ' + join_obj_query_by('and',obj,valid_queries),
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            }
        ));
    }

    static create(newUser)
    {
        return new Promise((resolve,reject) => sql.query(
            'INSERT INTO user set ?;',
            newUser,
            (err,result) => {
                if (err)
                    return reject(err);
                return resolve(result.insertId);
            }
        ));
    }
}

module.exports = User;
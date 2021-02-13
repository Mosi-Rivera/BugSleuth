'use strict';

const mysql = require('mysql');
const {
    db_host,
    db_user,
    db_password,
    db
} = require('../../keys');
const connection = mysql.createConnection({
    host: db_host,
    user:   db_user,
    password: db_password,
    database: db
});

connection.connect(function(err) {
    if (err)
        throw err;
    else
        console.log('connected to db.');
});

module.exports = connection;
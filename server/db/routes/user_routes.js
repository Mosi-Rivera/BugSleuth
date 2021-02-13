'use strict'
const passport = require('passport');
module.exports = function(app)
{
    const {
        get_by_id
    } = require('../controllers/user_controller');

    app.route('/users/:user_id')
    .get(get_by_id);
}
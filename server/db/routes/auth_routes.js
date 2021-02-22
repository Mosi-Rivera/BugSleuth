'use strict'
const passport = require('passport');
const {is_logged_in} = require('../../middleware/auth');
module.exports = function(app)
{
    const {
        signup,
        login_success,
        confirm_email,
        logout
    } = require('../controllers/auth_controller');

    app.route('/logout')
    .get(is_logged_in,logout);

    app.route('/signup')
    .post(
        signup,
        passport.authenticate('local'),
        login_success
    );

    app.route('/login')
    .get(is_logged_in,login_success)
    .post(passport.authenticate('local'),login_success);

    app.route('/confirm_email')
    .get(confirm_email)
}
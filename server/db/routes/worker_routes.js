'use strict';
const {
    invite_worker,
    create_worker
} = require('../controllers/worker_controller');
const {
    works_in_project,
    is_logged_in
} = require('../../middleware/auth');
module.exports = (app) => {
    app.route('/worker')
    //TODO: delete and update worker and role;
    .post(is_logged_in,works_in_project,invite_worker,create_worker);
}
'use strict';
const {
    invite_worker,
    create_worker,
    set_role,
    delete_worker,
    get_worker
} = require('../controllers/worker_controller');
const {
    works_in_project,
    is_logged_in
} = require('../../middleware/auth');
module.exports = (app) => {
    app.route('/worker')
    .post(is_logged_in,works_in_project(1),invite_worker,create_worker);

    app.route('/worker/data/:project_id')
    .get(is_logged_in,get_worker);

    app.route('/worker/:worker_id')
    .delete(is_logged_in,works_in_project(1),delete_worker)
    .put(is_logged_in,works_in_project(1),set_role);
}
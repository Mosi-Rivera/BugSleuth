'use strict';
const {
    create,
    get_by_id,
    update_by_id,
    delete_by_id,
    get_match,
    create_comment,
    get_by_assigned_user,
    set_assigned_worker
} = require('../controllers/ticket_controller');
const {
    is_logged_in,
    works_in_project
} = require('../../middleware/auth');

module.exports = function(app)
{
    app.route('/tickets')
    .get(is_logged_in,get_match)
    .post(is_logged_in,works_in_project(3),create);

    app.route('/tickets/assigned')
    .get(is_logged_in,get_by_assigned_user)
    .put(is_logged_in,works_in_project(2),set_assigned_worker);

    app.route('/tickets/:ticket_id')
    .get(is_logged_in,works_in_project(3),get_by_id)
    .put(is_logged_in,works_in_project(2),update_by_id)
    .delete(is_logged_in,works_in_project(1),delete_by_id);

    app.route('/comment')
    .post(is_logged_in,works_in_project(4),create_comment);
}
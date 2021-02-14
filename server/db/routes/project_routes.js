'use strict';
const {
    create,
    get_by_id,
    update_by_id,
    delete_by_id,
} = require('../controllers/project_controller');
const {
    is_logged_in,
    works_in_project
} = require('../../middleware/auth');
module.exports = function(app)
{
    app.route('/projects')
    .post(is_logged_in,create);

    app.route('/projects/:project_id')
    .get(is_logged_in,get_by_id)
    .put(is_logged_in,works_in_project(1),update_by_id)
    .delete(is_logged_in,works_in_project(0),delete_by_id);
}
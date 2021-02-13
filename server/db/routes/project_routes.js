'use strict';

module.exports = function(app)
{
    const {
        create,
        get_by_id,
        update_by_id,
        delete_by_id,
    } = require('../controllers/project_controller');

    app.route('/projects')
    .post(create);

    app.route('/projects/:project_id')
    .get(get_by_id)
    .put(update_by_id)
    .delete(delete_by_id);
}
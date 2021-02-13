'use strict';

module.exports = function(app)
{
    const {
        list_all,
        create,
        get_by_id,
        update_by_id,
        delete_by_id
    } = require('../controllers/ticket_controller');

    app.route('/tickets')
    .get(list_all)
    .post(create);

    app.route('/tickets/:ticket_id')
    .get(get_by_id)
    .put(update_by_id)
    .delete(delete_by_id);
}
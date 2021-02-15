const Ticket = require('../db/models/ticket_model');
const Worker = require('../db/models/worker_model');
const {isNaN} = Number;
exports.is_logged_in = function(req,res,next)
{
    if (req.isAuthenticated && req.user)
        return next();
    res.status(401).send('Unauthorized.');
}

exports.works_in_project = (min_role) => {
    return async (req,res,next) => {
        try
        {
            let ticket_id = Number.parseInt(req.body.ticket_id || req.params.ticket_id);
            let project_id = Number.parseInt(req.body.project_id || req.params.project_id);
            let worker_id = Number.parseInt(req.body.worker_id || req.params.worker_id);
            if (worker_id && isNaN(project_id))
            {
                let worker = await Worker.get_by_id();
                if (worker)
                {
                    project_id = Number.parseInt(worker.project_id);
                    res.locals.other_worker = worker;
                }
            }
            if (ticket_id && isNaN(project_id))
            {
                let ticket = await Ticket.get_by_id(ticket_id);
                if (ticket)
                    project_id = Number.parseInt(ticket.project_id);
            }
            if (isNaN(project_id))
                return res.status(401).send('Unauthorized.');

            let worker = (await Worker.get_match({
                user_id: req.user.id,
                project_id,
            }))[0];

            if (!worker || worker.role > min_role)
                return res.status(401).send('Unauthorized.')

            res.locals.worker = worker;

            next();
        }
        catch(err)
        {
            console.log(err);
            res.status(401).send('Unauthorized.');
        }
    }
}
const Worker = require('../models/worker_model');
const User = require('../models/user_model');
const email_validator = require('email-validator');
const uniqid = require('uniqid');
const bcrypt = require('bcrypt');
const {isNaN,parseInt} = Number;
const {
    worker_invitation,
    worker_notice
} = require('../../mailer/methods');
const rounds = 10;

exports.invite_worker = async (req,res,next) => {
    try
    {
        const email = req.body.email;
        if (!email)
            throw new Error('Invalid email provided.');
        let user = await User.get_by_email(email);
        if (!user)
        {
            if (!email_validator.validate(email))
                throw new Error('Invalid email.');
            let confirmation_code = uniqid();
            const salt = await bcrypt.genSalt(rounds);
            let hash = await bcrypt.hash(confirmation_code,salt);
            let new_user = new User({
                username: email.split('@')[0],
                email,
                password: hash,
                confirmation_code: hash,
                enabled: false
            });
            new_user.id = await new_user.save();
            res.locals.user = new_user;
            worker_invitation(email,req.user.username,confirmation_code);
        }
        else
        {
            res.locals.user = user;
            worker_notice(email,req.user.username);
        }
        next();
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.create_worker = async (req,res) => {
    try
    {
        if ((await Worker.get_by_email_in_project(res.locals.user.email,res.locals.worker.project_id))[0])
            return res.status(200).send('Invitation sent.');
        let new_worker = new Worker({
            user_id: res.locals.user.id,
            project_id: res.locals.worker.project_id,
            role: req.body.role || 3,
        });
        new_worker.id = await new_worker.save();
        new_worker.username = res.locals.user.username;
        new_worker.email = res.locals.user.email;
        return res.status(200).json(new_worker);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.delete_worker = async (req,res) => {
    try
    {
        let worker_id = Number.parseInt(re.params.worker_id);
        if (isNaN(worker_id))
            throw new Error('Invalid id.');
        let worker = res.locals.worker;
        let other_worker = res.locals.other_worker;
        if (!other_worker)
            throw new Error('Invalid request.');
        if (other_worker.role === 1 && worker.role !== 0)
            return res.status(401).send('Unauthorized.');
        await Worker.delete_by_id(worker_id);
        res.status(200).send('Worker (' + worker_id + ') deleted.');
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.get_worker = async (req,res) => {
    const project_id = Number.parseInt(req.params.project_id);
    try
    {
        if (isNaN(project_id))
            throw new Error('Invalid id');
        const result = await Worker.get_match({ user_id: req.user.id, project_id });
        res.status(200).json(
            result[0]
        );
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.set_role = async (req,res) => {
    try
    {
        let worker_id = req.body.worker_id;
        let role = req.body.role;
        let worker = res.locals.worker;
        let other_worker = res.locals.other_worker;
        if (!other_worker)
            throw new Error('Invalid request.');
        if (role < 0 || role > 3)
            throw new Error('Invalid role.');
        if ((other_worker.role == 0 || other_worker.role == 1 || role == 0) && worker.role !== 0)
            return res.status(401).send('Unauthorized.');
        await Worker.set_role_by_id(worker_id,role);
        res.status(200).send('role set to: ' + role);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}
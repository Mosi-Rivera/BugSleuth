const Worker = require('../models/worker_model');
const User = require('../models/user_model');
const email_validator = require('email-validator');
const uniqid = require('uniqid');
const {
    email_service,
    email_user,
    email_password
} = require('../../keys');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: email_service,
    auth: {
        user: email_user,
        pass: email_password
    }
});
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
            let password = uniqid();
            let new_user = new User({
                username: email.split('@')[0],
                email,
                password,
                enabled: false
            });
            await new_user.save();
            await transporter.sendMail({
                from: email_user,
                to: email,
                subject: `${req.user.username} has added you to their project!`,
                html: `<div>
                    <h1>WELCOME TO BUG SLEUTH!</h1>
                    <p>${req.user.username} had added you to their team.<br/><span>Click below to activate your account.</span></p>
                    <a href='http://localhost:4200/activate/${password}'>Activate Account</a>
                </div>`
            });
        }
        else
        {
            await transporter.sendMail({
                from: email_user,
                to: email,
                subject: `${req.user.username} has added you to their project!`,
                html: `<div>
                    <h1>YOU'VE BEEN ADDED TO A NEW PROJECT!</h1>
                    <p>${req.user.username} has added you to a project. <br/> Log in to check it out.</p>
                    <a href='http://localhost:4200'>Go to BugSleuth</a>
                </div>`
            });
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
        let new_worker = new Worker(req.body);
        new_worker.id = await new_worker.save();
        return res.status(200).json(worker);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}
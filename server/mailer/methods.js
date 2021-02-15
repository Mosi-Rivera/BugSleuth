const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const uniqid = require('uniqid');
const User = require('../db/models/user_model');
const {
    email_service,
    email_user,
    email_password
} = require('../keys');
const transporter = nodemailer.createTransport({
    service: email_service,
    auth: {
        user: email_user,
        pass: email_password
    }
});
exports.worker_invitation = (email,username,activation_code) => {
    transporter.sendMail({
        from: email_user,
        to: email,
        subject: `${username} has added you to their project!`,
        html: `<div>
            <h1>WELCOME TO BUG SLEUTH!</h1>
            <p>${username} had added you to their team.<br/><span>Click below to create an account.</span></p>
            <a href='http://localhost:4200/activate/${activation_code}?email=${email}'>Activate Account</a>
        </div>`
    });
}

exports.worker_notice = (email,username) => {
    transporter.sendMail({
        from: email_user,
        to: email,
        subject: `${username} has added you to their project!`,
        html: `<div>
            <h1>YOU'VE BEEN ADDED TO A NEW PROJECT!</h1>
            <p>${username} has added you to a project. <br/> Log in to check it out.</p>
            <a href='http://localhost:4200'>Go to BugSleuth</a>
        </div>`
    });
}

exports.send_confirmation_email = async (email,username) => {
    try
    {
        let confirmation_code = uniqid();
        let salt = await bcrypt.genSalt(10);
        let confirmation_hash = await bcrypt.hash(confirmation_code,salt);
        User.set_confirmation_code(email,confirmation_hash);
        transporter.sendMail({
            from: email_user,
            to: email,
            subject: `Confirm your email.`,
            html: `<div>
                <h1>Hi ${username}.</h1>
                <a href='http://localhost:4200/confirm_email?email=${email}&cc=${confirmation_code}'>Confirm email!</a>
            </div>`
        });
    }
    catch(err)
    {
        console.log(err);
    }
} 
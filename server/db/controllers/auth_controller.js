const User = require('../models/user_model');
const password_validator = (new (require('password-validator'))()
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces());
const email_validator = require('email-validator');
const bcrypt = require('bcrypt');
const rounds = 10;
const uniqid = require('uniqid');
const {isNaN} = Number;
const {send_confirmation_email} = require('../../mailer/methods');
exports.signup = async (req,res,next) => {
    try
    {
        const email = req.body.email;
        const password = req.body.password;
        if (!email_validator.validate(email))
            throw new Error('Invalid email.');
        if (!password_validator.validate(password))
            throw new Error('Invalid password.');
        const user = await User.get_by_email(req.body.email);
        if (user)
        {
            if (user.confirmed_email)
                throw new Error('This email is already linked to an account.');
            const key = req.body.key;
            if (key)
            {
                if (!(await bcrypt.compare(key,user.confirmation_code)))
                    throw new Error('Error.');
                const salt = await bcrypt.genSalt(rounds);
                const hashpass = await bcrypt.hash(password,salt);
                await User.confirm_email_and_activate(email,hashpass);
                return next();
            }
            const salt = await bcrypt.genSalt(rounds);
            const hashpass = await bcrypt.hash(password,salt);
            await User.activate(email,hashpass);
            send_confirmation_email(email,user.username);
            return next();
        }
        const salt = await bcrypt.genSalt(rounds);
        const hashpass = await bcrypt.hash(password,salt);
        const confirmation_code = uniqid();
        const confirmation_hash = await bcrypt.hash(confirmation_code,salt); 
        let new_user = new User({
            email,
            password: hashpass,
            username: email.split('@')[0],
            confirmation_code: confirmation_hash
        });
        await new_user.save();
        send_confirmation_email(email,new_user.username);
        next();
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.confirm_email = async (req,res) => {
    const email     = req.query.email;
    const key       = req.query.cc;
    try
    {
        let user = await User.get_by_email(email);
        if (!user || user.confirmed_email)
            throw new Error('Invalid email.');
        if (!await bcrypt.compare(key,user.confirmation_code))
            res.status(401).send('Unauthorized.');
        await User.confirm_email(email);
        res.status(200).send('Account enabled.');
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.login_success = (req,res) => {
    let user = req.user;
    res.status(200).json({
        username: user.username,
        email: user.email,
    });
}
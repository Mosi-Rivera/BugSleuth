const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const rounds = 10;
exports.signup = async (req,res,next) => {
    try
    {
        const email = req.body.email;
        const password = req.body.password;
        //TODO: validate username and password;
        const users = await User.get_match({email: req.body.email});
        if (users[0])
            throw new Error('This email is already linked to an account.');
        const salt = await bcrypt.genSalt(rounds);
        const hashpass = await bcrypt.hash(password,salt);
        let new_user = new User({
            email,
            password: hashpass,
            username: email.split('@')[0],
        });
        await new_user.save();
        next();
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
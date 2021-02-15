const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/models/user_model');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
const {
    db_host,
    db_user,
    db_password,
    db,
    db_port
} = require('../keys');
const store = new (require('express-mysql-session')(session))({
    host: db_host,
    port: db_port,
    user: db_user,
    password: db_password,
    database: db
});

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(async function(id, cb) {
    try
    {
        const user = await User.get_by_id(id);
        cb(null,user);
    }
    catch(err)
    {
        cb(err);
    }
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    async function(username, password, done) {
        try
        {
            let user = (await User.get_match({email:username}))[0];
            if (user.enabled == false)
                throw new Error('Unauthorized.');
            if (!user)
                return done(null,false,{message: 'Incorrect email.'});
            if (!(await bcrypt.compare(password,user.password)))
                return done(null,false,{message: 'Invalid password.'});
            return done(null,user);
        }
        catch(err)
        {
            return done(err);
        }
    }
));

module.exports = function (app) {
    app.use(session({ store, secret: 'poodles not cute', resave: false, saveUninitialized: true, cookie: {maxAge: 360000000} }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(passport.session());
}
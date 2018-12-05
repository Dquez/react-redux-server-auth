const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');


function tokenForUser(user) {
    const timestamp = new Date().getTime();
    // user.id === user._id
    return jwt.encode({
        sub: user.id,
        iat: timestamp
    }, config.secret);
}

exports.signup = function (req, res, next) {

    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        res.status(422).send({
            error: 'You must provide a password and email'
        })
    }
    // See if a user with given email exists
    User.findOne({
        email: email
    }, function (err, existingUser) {
        if (err) {
            return next(err);
        }

        // if user with email does exist, return error
        if (existingUser) {
            return res.status(422).send({
                error: 'Email is in use'
            })
        }
        // if user w/ email does not exist, create and save user
        const user = new User(req.body);
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            // respond to request indicating the user was create
            res.send({
                token: tokenForUser(user)
            })
        })
    })
}

exports.signin = function (req, res, next) {
    // User has already had their email authenticated
    // We just need to give them their token

    // passport attaches the current auth'd user to req.user
    res.send({
        token: tokenForUser(req.user)
    })
}
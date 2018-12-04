const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    // See if the user ID in the payload exists in our database
    User.findById(payload.subdomains, function(err, user){
        if(err) {return done(err, false);}
        // if it does. call done with that user
        if(user){
            done(null, user);
        }
        // otherwise, call done without it
        else{
            done(null,false)
        }
    })
})

// Tell passport to use this Strategy
passport.use(jwtLogin);
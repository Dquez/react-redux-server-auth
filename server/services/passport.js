const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const localStrategy = require('passport-local');


// Create Local Strategy
const localOptions = {usernameField: 'email'};
const localLogin = new localStrategy(localOptions, function(email,password, done){
    // Verify this username and pass, call done with the user if it's correct email/password, else call done with false 
    User.findOne({email: email}, function(err, user){
        if (err) {return done(err);}
        if (!user) {return done(null, false);}

        // compare passwords, is `password` === user.password?
        user.comparePassword(password, function(err, isMatch){
            if(err) {return done(err);}
            if(!isMatch) { return done(null, false);}
            return done(null, user)
        })
    })
})


// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    // See if the user ID in the payload exists in our database
    User.findById(payload.sub, function(err, user){
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
passport.use(localLogin);
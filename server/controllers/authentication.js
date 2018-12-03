const User = require('../models/user');

exports.signup = function(req,res,next){
    // See if a user with given email exists
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email}, function(err, existingUser){
        if(!existingUser){
            User.create(req.body, function(err, userCB){
                if(err) throw err;
                console.log(userCB)
            } );
        }
    })

    // if user with email does exist, return error

    // if user w/ email does not exist, create and save user

    // respond to request indicating the user was create
    res.send({success:true})
}
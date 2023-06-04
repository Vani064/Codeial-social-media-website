const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy; 
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use a new strategy for google login in
passport.use(new googleStrategy({

    clientID: "561934565984-t5ns1l8baqmqd03ht1kund945e0hbt59.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"

},

function(accessToken, refreshToken, profile, done){
    //find a user
    User.findOne({email: profile.emails[0].value}).then((user)=>{
        console.log(accessToken, refreshToken);
        console.log(profile);
        if(user){
            //if found, set this user as req.user
            return done(null,user);
        }else{
            //if not found create the user and set it as req.user,,
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }).then((user)=>{
                 return done(null,user);
            }).catch((err)=>{
                console.log('error in creating user google passport',err);
                return;
            });
        }
    }).catch((err)=>{
        
            console.log('error in google passport',err);
            return;
        
    });
}
));

module.exports = passport;
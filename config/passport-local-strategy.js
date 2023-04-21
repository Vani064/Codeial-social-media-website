const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    },function(req, email, password, done){
        //find user and establish its identity
        User.findOne({email: email}).then(function(user){
            if(!user || user.password != password)
            {
               req.flash('error',"Invalid user");
                return done(null,false);
            }
            return done(null, user);
        }).catch((err)=>{
            req.flash('error',err);
            return done(err);
        });
    }

));

//Serializing the user to decide which key is to kept in the cookies

passport.serializeUser(function(user,done){
    done(null, user.id);
    //storing the userid in cookies in encrypted form
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id).then(function(user){
        return done(null,user);
        //taking userid from the cookies
    }).catch((err) =>{
        console.log('Error');
        return done(err);
   });
});

passport.checkAuthentication = function(req,res,next){
    //if the user is signed in, then pass on the request to the next function(controller action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign_in');

}

passport.setAuthenticatedUser = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;



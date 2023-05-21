const passport = require('passport');
const jwtstrategy = require('passport-jwt').Strategy;
const Extractjwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts ={
    jwtFromRequest: Extractjwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
};

passport.use(new jwtstrategy(opts, function(jwtPayload, done){
  
    User.findById(jwtPayload._id).then((err,user)=>{
        if(user)
        {
            return done(null,user);
        }else{
            return done(null, false);
        }
    }).catch((err)=>{
        console.log('Error in finding user from JWT',err);
        return;
    });
    
}));

module.exports = passport;
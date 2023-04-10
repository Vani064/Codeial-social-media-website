const User = require('../models/user');

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: "User Profile"
    });
}

//controller syntax
// module.exports.actionName = function(req,res){};

module.exports.signup = function(req,res)
{
    return res.render('sign_up',{
        title: "Codeial | Sign Up"
    });
};

module.exports.signin = function(req,res)
{
    return res.render('sign_in',{
        title: "Codeial | Sign In"
    });
};

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}).then( function(user){
         if(!user){
            User.create(req.body).then( function(){
                 return res.redirect('/users/sign_in');
            }).catch((err) =>{
                    console.log('error');
                    return;
                 }
            );}
            else{
                return res.redirect('back');
            }
         }).catch((err) =>{
                console.log('error');
                return;
             
         });

};

//get the sign in data and create session for user
module.exports.createSession = function(req,res){

};
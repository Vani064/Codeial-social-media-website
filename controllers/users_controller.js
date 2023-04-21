const User = require('../models/user');

module.exports.profile = function(req,res){
    User.findById(req.params.id).then((user)=>{
    return res.render('user_profile',{
        title: "User Profile",
        profile_user: user
    });
    });
}

//controller syntax
// module.exports.actionName = function(req,res){};

module.exports.update = function(req,res){
    if(req.user.id == req.params.id)
    {
       User.findByIdAndUpdate(req.params.id,req.body
       ).then((user)=>{
          return res.redirect('back');
       });
    }else{
       return  res.status(401).send('Unauthorized');
    }
}

module.exports.signup = function(req,res)
{
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('sign_up',{
        title: "Codeial | Sign Up"
    });
};

module.exports.signin = function(req,res)
{
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
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
    return res.redirect('/users/profile');

};

module.exports.destroySession = function(req,res,next){
    //NOW REQ.LOGOUT IS A CALLBACK FUNCTION
    req.logout(function(err){
       if(err){
        return next(err);
       }
       res.redirect('/users/sign_in');
    });
    // return res.redirect('/users/sign_in');
};


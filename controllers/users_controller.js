const User = require('../models/user');

module.exports.profile = function(req,res){
   if(req.cookies.user_id){
      User.findById(req.cookies.user_id).then(function(user){
        if(user){
        return res.render('user_profile',{
            title: "User Profile",
            user: user
        });
    }else{
           return res.redirect('/users/sign_in');
        }}).catch((err)=>{
          console.log('error in opening user profile');
          return ;
      });
   }else{
    return res.redirect('/users/sign_in');
   }
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

   //find the user
   User.findOne({email: req.body.email}).then(function(user){
    if(user){
         
          //handle passwords which does not match
         if(user.password != req.body.password){
            return res.redirect('back');
         }
         //handle user found
         res.cookie('user_id', user.id);
         return res.redirect('/users/profile');
    }
    else{
        //handle user not found
        return res.redirect('back');
    }
    
   }).catch((err) =>{
    console.log('error in sign in ');
    return;
   });
   
};

module.exports.signout = function(req,res){
    res.clearCookie('user_id');
    return res.redirect('/users/sign_in');
}
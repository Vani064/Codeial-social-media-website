const User = require('../models/user');
const fs = require('fs');
const path = require('path');

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

module.exports.update = async function(req,res){

    //before uploading the avatar
    // if(req.user.id == req.params.id)
    // {
    //    User.findByIdAndUpdate(req.params.id,req.body
    //    ).then((user)=>{
    //       return res.redirect('back');
    //    });
    // }else{
    //    return  res.status(401).send('Unauthorized');
    // }

    //after uploading avatar (also made is async)
    if(req.user.id == req.params.id)
    {
        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('++++ Multer Error:',err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                      //replacing avatar
                        if(fs.existsSync(path.join(__dirname,'..', user.avatar))){
                           fs.unlinkSync(path.join(__dirname,'..', user.avatar));
                        }


                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath+ '/' + req.file.filename;
                }
                user.save();
                req.flash('success','File has been uploaded successfully!');
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');}

    }else{
        req.flash('error','Unauthorized!');
        return  res.status(401).send('Unauthorized');
    }
}

module.exports.signup = function(req,res)
{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_up',{
        title: "Codeial | Sign Up"
    });
};

module.exports.signin = function(req,res)
{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
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
    req.flash('success','Logged in successfully');
    return res.redirect('/');

};

module.exports.destroySession = function(req,res,next){
    //NOW REQ.LOGOUT IS A CALLBACK FUNCTION
    req.logout(function(err){
        req.flash('success','Logged out successfully');
       if(err){
        return next(err);
       }
       res.redirect('/');
    });
    // return res.redirect('/users/sign_in');
};


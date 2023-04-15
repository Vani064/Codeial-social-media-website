const Post = require('../models/post');

module.exports.home = function(req,res){

    //before ejs file
    // return res.end('<h1>Express is up!!</h1>');

    //altering creating cookies
    // console.log(req.cookies);
    // res.cookie('user_id',25);

    Post.find({}).populate('user').then((posts)=>{
    return res.render('home',{
        title: "Codeial | Home",
        posts: posts
    });
});
};

//module.exports.actionName = function(req,res){}

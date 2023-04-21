const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req,res){

    //before ejs file
    // return res.end('<h1>Express is up!!</h1>');

    //altering creating cookies
    // console.log(req.cookies);
    // res.cookie('user_id',25);

   //populate the user of each post
//     Post.find({}).populate('user').then((posts)=>{
//     return res.render('home',{
//         title: "Home",
//         posts: posts
//     });
// });
// };

//populate user comments of each post
Post.find({})
.populate('user')
.populate({
       path:'comments',
       populate: {
        path: 'user'
    }
    }).then((posts)=>{

        User.find({}).then((users)=>{
            return res.render('home',{
            title: "Home",
            posts: posts,
            all_users: users
        });
    
    });
});
};

//module.exports.actionName = function(req,res){}

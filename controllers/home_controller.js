const Post = require('../models/post');
const User = require('../models/user');

//using async for this
module.exports.home = async function(req,res){

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

//populate user comments of each post //promises using then and catch
// Post.find({})
// .populate('user')
// .populate({
//        path:'comments',
//        populate: {
//         path: 'user'
//     }
//     }).then((posts)=>{

//         User.find({}).then((users)=>{
//             return res.render('home',{
//             title: "Home",
//             posts: posts,
//             all_users: users
//         });
    
//     });
// });
// };

//populate user comments of each post //promises using async await and using try and catch to handle error
try{
let posts = await Post.find({})
.sort('-createdAt')
.populate('user')
.populate({
       path:'comments',
       populate: {
        path: 'user'
    },//for comments
        populate: {
            path: 'likes'
        }
    }).populate('likes');//for posts
    
    let users = await User.find({});

    return res.render('home',{
        title: "Home",
        posts: posts,
        all_users: users
    });
}catch(err){
    console.log('Error',err);
    return;
}
    

};

//module.exports.actionName = function(req,res){}

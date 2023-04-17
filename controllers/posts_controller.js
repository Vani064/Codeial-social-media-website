const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).catch((err)=>{
        console.log("error in creating a post");
        return;
    });
    return res.redirect('back');
};

module.exports.destroy = function(req,res){
    Post .findById(req.params.id).then((post)=>{
        //.id means converting the object id into string
        if(post.user == req.user.id){
            post.deleteOne();

            Comment.deleteMany({post: req.params.id}).catch((err)=>{
                return res.redirect('back');
            });
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    });
}
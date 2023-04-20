const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.findById(req.body.post).then((post) => {
    if (post) {
      Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      })
        .then((comment) => {
          post.comments.push(comment);
          post.save();
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err, "unable to create comment");
          return;
        });
    }
  });
};

module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id).then((comment) => {
    let postId = comment.post;
    if (comment.user == req.user.id) {
      comment.deleteOne();
      Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      }).catch((err) => {
        return res.redirect("back");
      });
      return res.redirect("back");
    }else{

Post.findById(postId).then((posts)=>{
         if(posts.user == req.user.id){
    
      comment.deleteOne();
      Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      }).catch((err) => {
        return res.redirect("back");
      });
      return res.redirect("back");
    }else{
        return res.redirect("back");
    }
    }).catch((err)=>
    {
        console.log(err, "error");
        return res.redirect("back");
    });
    return res.redirect("back"); 
  }}).catch(()=>{
    console.log("error in deleting the comment");
    return res.redirect("back");
  });
};

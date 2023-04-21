const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try{
  let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
          post.comments.push(comment);
          post.save();
          req.flash('success',"You have commented on the post");
          res.redirect("/");   
    }else{
      req.flash('error',"You can't comment on the post");
      return res.redirect('/');
    }
}catch(err){
  
  req.flash('error',"Not able to comment");
          return res.redirect('/');
}
};

module.exports.destroy = async function (req, res) {

  try{
  let comment = await Comment.findById(req.params.id);
    let postId = comment.post;
    if (comment.user == req.user.id) {
      //delete our comment on a post
      comment.deleteOne();
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id }
      });
       req.flash('success',"You have deleted your comment.");
        return res.redirect("back");
    }else{
      //deleting any comments on our post
      let posts = await Post.findById(postId);
         if(posts.user == req.user.id){
    
      comment.deleteOne();
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      req.flash('success',"You have deleted a comment on your post.");
        return res.redirect("back");
    
    }else{
      req.flash('error',"You cannot delete your comment.");
        return res.redirect("back");
    }
   }
  }catch(err){
    req.flash('error',err);
    return res.redirect("back");
  }

};

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
          res.redirect("/");   
    }else{
      return res.redirect('/');
    }
}catch(err){
  
  console.log(err, "unable to create comment");
          return;
}
};

module.exports.destroy = async function (req, res) {

  try{
  let comment = await Comment.findById(req.params.id);
    let postId = comment.post;
    if (comment.user == req.user.id) {
      
      comment.deleteOne();
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id }
      });
        return res.redirect("back");
    }else{

      let posts = await Post.findById(postId);
         if(posts.user == req.user.id){
    
      comment.deleteOne();
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
        return res.redirect("back");
    
    }else{
        return res.redirect("back");
    }
   }
  }catch(err){
    console.log("error in deleting the comment",err);
    return res.redirect("back");
  }

};

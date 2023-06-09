const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require('../mailers/comments_mailers');



const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require("../config/kue");
const Like = require("../models/like");

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


          comment = await comment.populate('user', 'name email avatar');
          commentsMailer.newComment(comment);
           //we remove this as we are using delayed jobs - queue for this request

          // let job = queue.create('emails',comment).save(function(err){
          //    if(err){
          //     console.log(' error in creating a queue', err);
          //     return;
          //    }
          //    console.log('job enqueued',job.id);
          // });

          if(req.xhr){
            //same like post created
            return res.status(200).json({
              data: {
                comment: comment
              },
              message: 'Post created!'
            });
          }
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
      let post =  Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id }
      });

      //delete the likes associated with in
      await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

      if(req.xhr){
        return res.status(200).json({
          data:{
            comment_id: req.params.id
          },
          message: "your comment deleted successfully!"
        });
      }
       req.flash('success',"You have deleted your comment.");
        return res.redirect("back");
    }else{
      //deleting any comments on our post
      let posts = await Post.findById(postId);
         if(posts.user == req.user.id){
    
      comment.deleteOne();
      let post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
           //delete the likes associated with in
      await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
        if(req.xhr)
        {
          return res.status(200).json({
            data:{
              comment_id: req.params.id
            },
            message: "comment on your post is deleted."
          });
        }

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

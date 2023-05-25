const Like = require("../models/like");
const Comment = require("../models/comment");
const Post = require("../models/post");


module.exports.toggleLike = async function(req,res){
    try{


        //likes/toggle/?id=abcde&type=Post
        let likeable ;
        //for maintaining toggle value
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
        

        //check if like already exists 
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        if(existingLike){
            //if already exists delete it 
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.deleteOne();
            deleted = true;
        }else{
          //else create a new one
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id, 
                onModel: req.query.type
            });
            likeable.likes.push(newLike._id);
             likeable.save();
        }

        return res.json(200,{
            message: " Request successful ",
            data: {
                deleted: deleted
            }
        });
       }catch(err){
        console.log(err);
        return res.json(500,{
            message: "Internal Server Error"
        });
    }
}
const User = require("../models/user");
const Friendship = require("../models/friendships");



module.exports.addFriend = async function(request , response){


    let existingFriendship = await Friendship.findOne({
        from_user : request.user,
        to_user : request.query.id,
    });

    let toUser = await User.findById(request.user);
    let fromUser = await User.findById(request.query.id);

    let deleted = false;

    if(existingFriendship){
        toUser.friendships.pull(existingFriendship._id);
        fromUser.friendships.pull(existingFriendship._id);
        toUser.save();
        fromUser.save();
        existingFriendship.deleteOne();
        deleted = true;
        removeFriend = true;
    }else{
        let friendship = await Friendship.create({
            to_user : request.query.id,
            from_user : request.user._id
        });

        toUser.friendships.push(friendship);
        fromUser.friendships.push(friendship);
        toUser.save();
        fromUser.save();
    }

    if(request.xhr){
        return response.status(200).json({
            deleted : deleted , 
            message : "Request Successful",
        });
    }


    
     return response.redirect('back');
}
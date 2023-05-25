const mongoose = require('mongoose');

const likeschema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId
    },
    //this defined the object id of the liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        //for dynamic reference
        //refpath defines the type of liked object = like on post or comment
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
},{
    timestamps: true
});

const Like = mongoose.model('Like', likeschema);
module.exports = Like;
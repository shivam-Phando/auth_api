const mongoose = require('mongoose')
const {Schema} = mongoose
const postSchema = new mongoose.Schema({
    content:{
       type:String,
       required:true
    },
    images:[{
        type:String,
        // required:true
    }],
    likes:[{
      types:mongoose.Schema.Types.ObjectId,
      ref:('user')
    }],
    commentsId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:('comments')
    },
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:("user"),
    required:true
   },
   createdAt:{
    type:Date,
    default:Date.now,
    required:true

   }
})
const Post = mongoose.model("Post",postSchema)

module.exports = Post;
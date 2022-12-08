const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        default:""
    },
    password:{
        type:String,
        required:true
    },
    profile_pic:{
        type:String,
        required:true,
        default:"https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg"
    },
    cover_pic:{
        type:String,
        default:""
    },
    
    token:{
        type:String,
    }
})

const User = mongoose.model("User",userSchema)
module.exports = User;
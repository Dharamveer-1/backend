const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email:{type:String,default:null},
    password:{type:String,default:null},
    userType:{type:String,default:2},
    createdAt:{type:Date,default:Date.now()},
    status:{type:Boolean,default:true},
});

module.exports = mongoose.model("user",userSchema);
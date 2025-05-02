const mongoose = require('mongoose');
const packageSchema = mongoose.Schema({  
    packageName: {type:String, default:null},
    thumbnail: {type:String, default:'no_image.jpeg'},
    description: {type:String, default:null},
    cost:{type:String,default:null},
    duration:{type:String,default:null},
    status: {type:Boolean, default:true},
    createAt: {type:Date, default:Date.now()},
});

module.exports =new mongoose.model('package', packageSchema);
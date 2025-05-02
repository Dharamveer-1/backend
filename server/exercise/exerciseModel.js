const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    exerciseName: {type:String, default:null},
    thumbnail: {type:String, default:'no_image.jpg'},
    description: {type:String, default:null},
    status: {type:Boolean, default:true},
    createAt: {type:Date, default:Date.now()},
});

module.exports = mongoose.model('exercise', exerciseSchema);
const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.ObjectId,ref:'customer',default:null},
    cardno:{type:String, default:null},
    cvp:{type:String, default:null},
    expiredate:{type:String, default:null},
    dateofBooking:{type:String, default:null},
    status: {type:String, default:'accept'},
    createAt: {type:Date, default:Date.now()},
});

module.exports = mongoose.model('booking', bookingSchema);
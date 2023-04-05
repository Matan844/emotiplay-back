const mongoose = require('mongoose');
const User = require('./User');
const Video = require('./Video');

const ReviewSchema = new mongoose.Schema({
    content: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    },
    inappropriate:{
        type:Boolean,
        default:false
    },
    quality:{
        type:Number,
        default:0
    },
    validation:{
        type:String
    }
});
module.exports = mongoose.model('Review', ReviewSchema);
const mongoose = require("mongoose");
const Review = require('./Review');
const Video = require('./Video');


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }],
    watchedVideos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        unique: true
      }]
});

module.exports = mongoose.model('User', UserSchema)
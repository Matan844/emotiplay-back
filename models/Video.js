const mongoose = require("mongoose");
const User = require("./User");
const Review = require('./Review');
const Emotion = require('./Emotion');

const VideoSchema = new mongoose.Schema({
    cloudinaryLink: {
        type: String,
        required: true,
        unique: true
    },
    feeling: {
        spectrum: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Emotion'        },
        emotion: {
            type: String        }
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    votes: {
        type: Number,
        default: 0
    },
    inappropriate: {
        type: Number,
        default: 0
    },
    status:{
        type:String,
        default: "In 1st check"
    },
    quality: {
        type: Object,
        1: {
            type: Number,
            default: 0
        }
        ,
        2: {
            type: Number,
            default: 0

        },
        3: {
            type: Number,
            default: 0

        },
        4: {
            type: Number,
            default: 0

        },
        5: {
            type: Number,
            default: 0

        },
    }
    ,
    validation: {
        type: Object,
        random: {
            type: Number,
            default: 0

        },
        correct: {
            type: Number,
            default: 0

        },
        wrong: {
            type: Number,
            default: 0

        }
    }
})

module.exports = mongoose.model("Video", VideoSchema);
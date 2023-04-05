const mongoose = require('mongoose');
const Video = require('./Video');


const EmotionSchema = new mongoose.Schema({
    spectrum: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: "grey"
    },
    stock: [{
        title: {
            type: String,
            unique:true
        },
        need: {
            type: Boolean,
            default: true
        },
        content: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }]
    }]
});

module.exports = mongoose.model("Emotion", EmotionSchema);



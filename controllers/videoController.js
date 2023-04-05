const Video = require('../models/Video');
const Emotion = require('../models/Emotion');
const { default: mongoose } = require('mongoose');
const Review = require('../models/Review');
const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");

dotenv.config();
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

module.exports.addVideo = async (req, res) => {
  const { cloudinaryLink, emotionId, emotion, spectrum, uploader } = req.body;

  try {
    const feeling = await Emotion.findOne({ 'stock._id': emotionId });
    if (!feeling) {
      return res.status(404).json({ message: 'Emotion not found' });
    }
    const matchingStock = feeling.stock.find((stock) =>
      String(stock._id) === emotionId);
    if (!matchingStock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    const video = new Video({
      cloudinaryLink: cloudinaryLink,
      feeling: {
        spectrum: spectrum,
        emotion: emotion
      },
      uploader: uploader
    });
    await video.save();

    matchingStock.content.push(video._id);
    await feeling.save();

    res.status(200).json({ message: 'Video added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', err });
  }
};

module.exports.allVideos = (req, res) => {
  Video.find({ votes: { $lte: 50 } })
    .sort({ votes: -1 })
    .then((data) => {
      if (data) {
        res.status(200).json(data)
      }
      else {
        res.status(500).json({ message: "no videos located" })
      }
    })
};

module.exports.deleteFromCloudinary = (req, res) => {

};

module.exports.changeStatus = async (req, res) => {
  Video.findByIdAndUpdate(req.params.videoId,
    { status: req.body.status },
    { new: true })
    .then((response) => {
      if (!response) {
        res.status(404).json({ message: "video not found, try another id" })
      } else {
        res.status(200).json({
          message: "status updated successfully",
          response
        })
      }
    })
    .catch(error => res.status(500).json({
      message: "something went wrong",
      error
    }))
}

 
module.exports.deleteVideo = async (req, res) => {
  const videoId =  req.body.id;
  
  try {
    const deletedVideo = await Video.findByIdAndDelete(videoId);
    console.log(videoId);
    if (!deletedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }
    return res.status(200).json({ message: 'Video deleted successfully' })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports.deletefromcloudinaryVideo = async (req, res) => {
  const publicId = await  req.body.publicId;
try {
  await cloudinary.uploader.destroy(publicId ,{resource_type: 'video'} , function(error,result) {
      if (result) {
        res.status(200).json({message:  result})
      }
      else {
        res.status(500).json({ message: error })
  }}) 
} catch (res) {
  console.log(res);
}
}




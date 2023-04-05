const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Video = require('../models/Video')
module.exports.createUser = async (req, res) => {
  const email = req.body.email;
  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      const newUser = await User.create({ email: email });
      return res.status(200).json(newUser);
    } else return res.status(201).json(userExists);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.checkID = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userId = user._id;
    return res.json({ userId: userId });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.watchedVideoSave = async (req, res) => {
  const { userId, videoId } = req.body;
  console.log(userId + videoId );
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    user.watchedVideos.push(video._id);
    await user.save();

    res.json({ message: 'Video watched' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports.getallviedvideos = async (req, res) => { 
  const { userId } =  req.body;
  try {
    const user = await User.findById(userId)
    const watchedvideo = user.watchedVideos
    console.log(watchedvideo);
    return res.status(200).json({ message: watchedvideo });
  } catch (error) {
    res.status(500).json({message: "errorrr"})
  }
}
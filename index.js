const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Video = require('./models/Video');
const videoRoutes = require("./routers/videoRoutes");
const ratingRoutes = require("./routers/ratingRoutes");
const emotionRoutes = require("./routers/emotionRoutes");
const userRoutes = require("./routers/userActionRoutes");
const checkID = require("./routers/userActionRoutes")
const dotenv = require("dotenv");
const cloudinary = require('cloudinary').v2;

dotenv.config();
mongoose
  .connect(
    "mongodb+srv://emotiplay:emotiplay@cluster0.mqbcnqd.mongodb.net/test",
    {}
  )
  .then(() => {
    console.log("connection to data base successed");
  })
  .catch((error) => {
    console.log("error");
    console.log(error);
  });


cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});


async function deleteUnusedVideos() {
  try {
    const videos = await Video.find();
   
    const cloudinaryResources = await cloudinary.api.resources({
      type: 'upload',
      format: 'mp4',
      resource_type: 'video'
    });
    const cloudinaryLinks = cloudinaryResources.resources.map((resource) => {
      return resource.secure_url
    });
    const usedLinks = videos.map((video) => {
      return video.cloudinaryLink.split('/').slice(-1)[0].split('.')[0]
    });

    const unusedLinks = cloudinaryLinks.filter((link) => { 
     const splitlink = link.split('/').slice(-1)[0].split('.')[0]
      return !usedLinks.includes(splitlink)
    });
  
    unusedLinks.forEach(async (link) => { 
      const publicId =  link.split('/').slice(-1)[0].split('.')[0];
      console.log(unusedLinks);
      console.log(`Deleting ${publicId}`);
      cloudinary.uploader.destroy(publicId , {resource_type: 'video'});});
  } catch (err) {
    console.log('Error deleting unused videos', err);
  }
}
const intervalId = setInterval(deleteUnusedVideos, 7 * 24 * 60 * 60 * 1000); // 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
const app = express();
app.use(express.json());
app.use(cors());

app.use("/video", videoRoutes);
app.use("/rate", ratingRoutes);
app.use("/emotion", emotionRoutes);
app.use("/user", userRoutes);
// app.get('/login', login)

app.listen(8639, () => console.log("listening on port 8639"));

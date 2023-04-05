const express = require('express');
const router = express.Router();
const { addVideo, allVideos, deleteFromCloudinary, changeStatus ,deleteVideo,deletefromcloudinaryVideo  } = require('../controllers/videoController');

router.post('/addVideo', addVideo)
router.post('/deleteVideo', deleteVideo)
router.post('/deletefromcloudinaryVideo', deletefromcloudinaryVideo)
router.get('/allVideos', allVideos)
router.put('/changeStatus/:videoId', changeStatus)

module.exports = router;
const express = require('express');
const router = express.Router()
const { createSpectrum,
    getAll,
    addEmotion,
    deleteSpectrum,
    deleteEmotion, 
    updateSpectrum,
    updateEmotion,
    changeNeed
} = require("../controllers/emotionController")

router.get("/allEmotions", getAll);
router.post("/createSpectrum", createSpectrum);
router.post("/addEmotion/:spectrumId", addEmotion);
router.delete("/deleteSpectrum/:spectrumId", deleteSpectrum);
router.post("/deleteEmotion/", deleteEmotion);
router.put("/updateSpectrum/:spectrumId", updateSpectrum);
router.put("/updateEmotion", updateEmotion);
router.post('/changeNeed/:spectrumId', changeNeed)

module.exports = router;


const Emotion = require("../models/Emotion");

module.exports.getAll = (req, res) => {
  Emotion.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => res.status(500).json({ message: "errorrrr:", error }));
};

//////////////////////////////-----------------CREATE--------------------///////////////////--------
module.exports.createSpectrum = (req, res) => {
  const newEmotion = new Emotion(req.body);
  newEmotion.save((error, emotion) => {
    if (error) {
      res.status(500).json({
        message: "error:",
        error,
      });
    } else {
      res.status(200).json({
        message: "Emotion created successfully",
        emotion,
      });
    }
  });
};

module.exports.addEmotion = (req, res) => {
  Emotion.findByIdAndUpdate(req.params.spectrumId, {
    $push: { "stock": req.body },
  }, { new: true }
  )
    .then((response) => {
      if (!response) {
        res.status(404).json({ message: "spectrum not found" });
      } else {
        res.status(200).json({
          message: "Emotion added successfully",
          response,
        })
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: "something is wrong",
        err,
      })
    );
};

//////////////////////////////-----------DELETE-------------------//////////////////////--------------------
module.exports.deleteSpectrum = (req, res) => {
  Emotion.findByIdAndDelete(req.params.spectrumId)
    .then((response) => {
      if (!response) {
        res.status(404).json({
          message: "spectrum not found"
        });
      } else {
        res.status(200).json({
          message: "spectrum deleted successfully", response
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "failed to delete spectrum" });
    });
};

module.exports.deleteEmotion = async (req, res) => {
  try {
    const { spectrumId, emotionId, emotionTitle } = req.body
    const emotion = await Emotion.findOneAndUpdate({ _id: spectrumId },
      { $pull: { stock: { _id: emotionId, title: emotionTitle } } }, { new: true })
    if (!emotion) {
      res.status(404).json({ message: "spectrum isn't found" });
    } else res.status(200).json({
      message: 'Emotion deleted successfully',
      updatedSpectrum: emotion,
    });
  } catch (error) {
    res.status(500).json({
      message: 'May be, the information you provided is not contained in the DB',
      error
    })
  }
};

//////////////////////////////////---------------UPDATE---------------////////////-------------------------
module.exports.updateSpectrum = (req, res) => {
  const { spectrum, color } = req.body;
  Emotion.findByIdAndUpdate(req.params.spectrumId, {
    spectrum: spectrum,
    color: color,
  }, { new: true })
    .then((response) => {
      if (!response) {
        res.status(404).json({ message: "Spectrum not found" });
      } else {
        res.status(200).json({
          message: "Spectrum updated successfully",
          response,
        });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: "coudn't update spectrum",
        err,
      })
    );
};

module.exports.updateEmotion = async (req, res) => {
  const { emotion, emotionId, spectrumId } = req.body;

  await Emotion.findOneAndUpdate(
    { _id: spectrumId, "stock._id": emotionId },
    {
      $set: {
        "stock.$.title": emotion
      },
    },
    { new: true }
  )
    .then((response) => {
      if (!response) {
        res.status(404).json({ message: "Emotion not found" });
      } else {
        res.status(200).json({
          message: "Emotion updated successfully",
          response,
        });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: "coudn't update Emotion",
        err
      })
    );
};

module.exports.changeNeed = async (req, res) => {
  try {
    const spectrum = await Emotion.findById(req.params.spectrumId);
    spectrum.stock[req.body.index].need = req.body.need;
    const updatedEmotion = await Emotion.findByIdAndUpdate(
      req.params.spectrumId,
      spectrum,
      { new: true }
    );
    res.status(200).json(updatedEmotion);
  } catch (Err) {
    console.log(Err);
  }
};


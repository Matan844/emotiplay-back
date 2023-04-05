const Video = require('../models/Video');

module.exports.review = (req, res) => {
    const success = "video successfully rated";
    const fail = "couldn't rate quality, ...no item?"
    const scale = req.body.scale
    const option = req.body.option
    if (scale && option) {

        Video.findByIdAndUpdate(req.params.id, {
            $inc: {
                [`quality.${scale}`]: 1,
                "votes": 1,
                [`validation.${option}`]: 1
            }
        })
            .then((item) => {
                if (!item) { res.status(500).send({ message: fail }); }
                else { res.status(200).json({ message: success , item}); }
            })
            .catch((error) => { res.status(500).json({ message: "error:", error }) });
    } else {
        res.status(500).send({ message: "please provide scale and option" });
    }

};


module.exports.inappropriate = (req, res) => {
    Video.findByIdAndUpdate(req.params.id, { $inc: { inappropriate: 1 } })
        .then(
            (item) => {
                if (!item) {
                    res.status(500).send({ message: "can't asses" })
                }
                else {
                    res.status(200).json({ message: "inappropriate rated", item })
                }
            })
}
const User = require('./models/User')
const Video = require('./models/Video')

module.exports.login = (req, res) => {
    User.findOne({
        email: req.body.email,
    },
        (error, user) => {
            if (error) {
                res.status(500).send({ message: "couldn't find a user" })
            }
            else if (user == null) {
                res.status(404).send({ message: "user doesn't exist" })
            }
            else if (req.body.email == User.Email
                && req.body.Password !== user.Password || req.body.userName !== user.userName) {
                res.status(404).send({ message: "password/username doesn't match" })
            }
            else {
                res.status(200).json({ message: "succssesfully logged in" })
            }
        }
    )
}




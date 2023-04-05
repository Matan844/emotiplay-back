const express = require('express');
const { createUser } = require('../controllers/userControllaer');
const { checkID } = require('../controllers/userControllaer');
const { watchedVideoSave , getallviedvideos} = require('../controllers/userControllaer');

const router = express.Router();

router.post('/createUser', createUser)
router.post('/checkID', checkID)

router.post('/watchedVideoSave', watchedVideoSave)
router.post('/getallviedvideos', getallviedvideos)

module.exports = router;
const express = require('express');
const router = express.Router();
const { review, inappropriate } = require('../controllers/ratingController');

router.put('/rateVideo/:id', review)
router.post('/rateVideo/:id', inappropriate)

module.exports = router;
var express = require('express');
var router = express.Router();

const {createItinerary} = require('../controllers/itineraryController');

router.post('/', createItinerary);
module.exports = router;

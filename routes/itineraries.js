var express = require('express');
var router = express.Router();

const {createItinerary, updateItinerary} = require('../controllers/itineraryController');

router.post('/', createItinerary);
router.patch('/:id', updateItinerary);

module.exports = router;

var express = require('express');
var router = express.Router();

const {createItinerary, getAllItineraries, updateItinerary, deleteItinerary} = require('../controllers/itineraryController');

router.get('/', getAllItineraries)
router.post('/', createItinerary);
router.patch('/:id', updateItinerary);
router.delete('/:id', deleteItinerary);

module.exports = router;

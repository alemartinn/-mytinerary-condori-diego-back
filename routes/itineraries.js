var express = require('express')
var router = express.Router()

const {createItinerary, readItinerary, updateItinerary, deleteItinerary} = require('../controllers/itineraryController')

router.post('/', createItinerary);
router.get('/:id', readItinerary);
router.patch('/:id', updateItinerary);
router.delete('/:id', deleteItinerary);

module.exports = router;

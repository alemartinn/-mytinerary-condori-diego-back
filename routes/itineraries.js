var express = require('express');
var router = express.Router();
const passport = require('../config/passport');

const {createItinerary, getAllItineraries, updateItinerary, deleteItinerary} = require('../controllers/itineraryController');

router.get('/', getAllItineraries)
router.post('/', createItinerary);
router.patch('/:id', updateItinerary);
router.delete('/:id', deleteItinerary);
router.patch('/itineraries/likes', passport.authenticate('jwt', {session:false}), likeDislike)

module.exports = router;

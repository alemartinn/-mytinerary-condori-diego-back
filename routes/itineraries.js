var express = require('express');
var router = express.Router();
const passport = require('../config/passport');

const {createItinerary, getOneItinerary, getAllItineraries, updateItinerary, deleteItinerary, likeDislike} = require('../controllers/itineraryController');

router.get('/', getAllItineraries)
router.get('/:id', getOneItinerary)
router.post('/', createItinerary);
router.patch('/:id', updateItinerary);
router.delete('/:id', deleteItinerary);
router.patch('/like/:id', passport.authenticate('jwt', {session:false}), likeDislike)

module.exports = router;

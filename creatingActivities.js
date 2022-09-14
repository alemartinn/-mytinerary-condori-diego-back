
require('dotenv').config();
const db = require('./config/database');

const Activity = require('./models/Activity');

const idItineraries = [
    "6319d9d9d227c639cd7b6733", "6319d9d9d227c639cd7b6734", "6319d9d9d227c639cd7b6735", "6319d9d9d227c639cd7b6736", "6319d9d9d227c639cd7b6731", "6319d9d9d227c639cd7b6739", "6319d9d9d227c639cd7b6732", "6319d9d9d227c639cd7b673a", "6319d9d9d227c639cd7b673c", "6319d9d9d227c639cd7b673b", "6319d9d9d227c639cd7b673d", "6319d9d9d227c639cd7b673e", "6319d9d9d227c639cd7b673f", "6319d9d9d227c639cd7b6740", "6319d9d9d227c639cd7b6741", "6319d9d9d227c639cd7b6742", "6319d9d9d227c639cd7b6737", "6319d9d9d227c639cd7b6738"]

idItineraries.forEach(idItinerary => {
    const ourActivities = [
        {name: 'Activity One', photo: 'activity_one.jpg', itinerary: idItinerary},
        {name: 'Activity Two', photo: 'activity_two.jpg', itinerary: idItinerary},
        {name: 'Activity Two Duplicate', photo: 'activity_two_duplicate.jpg', itinerary: idItinerary}
    ]
    Activity.create(ourActivities[0]);
    Activity.create(ourActivities[1]);
    Activity.create(ourActivities[2]);
})

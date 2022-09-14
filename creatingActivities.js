
require('dotenv').config();
const db = require('./config/database');

const Activity = require('./models/Activity');

const idItineraries = [
    '6319d9d9d227c639cd7b6731',
    '6319d9d9d227c639cd7b6732',
    '6319d9d9d227c639cd7b6749'
]


// ourActivities.forEach(element => Activity.create(element));

idItineraries.forEach(idItinerary => {
    const ourActivities = [
    {name: 'Activity One', photo: 'activity_one.jpg', itinerary: idItinerary},
    {name: 'Activity Two', photo: 'activity_two.jpg', itinerary: idItinerary},
    {name: 'Activity Two Duplicate', photo: 'activity_two_duplicate.jpg', itinerary: idItinerary}
    ]
    Activity.create(ourActivities[0]);
    Activity.create(ourActivities[1]);
    Activity.create(ourActivities[2]);
});
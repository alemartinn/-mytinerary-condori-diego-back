
require('dotenv').config();
const db = require('./config/database');

const Activity = require('./models/Activity');

const ourActivities = [
    {name: 'Activity One', photo: 'activity_one.jpg', itinerary: '6319d9d9d227c639cd7b6731'},
    {name: 'Activity Two', photo: 'activity_two.jpg', itinerary: '6319d9d9d227c639cd7b6731'},
    {name: 'Activity Two Duplicate', photo: 'activity_two_duplicate.jpg', itinerary: '6319d9d9d227c639cd7b6732'}
]

ourActivities.forEach(element => Activity.create(element));
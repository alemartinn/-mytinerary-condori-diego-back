
require('dotenv').config();
const db = require('./config/database');

const Activity = require('./models/Activity');

const ourActivities = [
    {name: 'Activity One', photo: 'activity_one.jpg', itinerary: '63191e5019e820ede7918c50'},
    {name: 'Activity Two', photo: 'activity_two.jpg', itinerary: '63191e5019e820ede7918c51'},
    {name: 'Activity Two Duplicate', photo: 'activity_two_duplicate.jpg', itinerary: '63191e5019e820ede7918c51'}
]

ourActivities.forEach(element => Activity.create(element));
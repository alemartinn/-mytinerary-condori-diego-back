require('dotenv').config();
const db = require('./config/database');

const Comment = require('./models/Comment');

const ourComments = [
    {
        comment: "It's Awesome",
        user: "6319b98af587b99d89bf4e20",
        itinerary: "6319d9d9d227c639cd7b6733"
    },
    {
        comment: "GREAT!!",
        user: "6319b98af587b99d89bf4e1f",
        itinerary: "6319d9d9d227c639cd7b6734"
    }
]

ourComments.forEach(commentary => Comment.create(commentary));
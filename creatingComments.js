require('dotenv').config();
const db = require('./config/database');

const Comment = require('./models/Comment');

const ourComments = [
    {
        comment: "It's Awesome",
        user: "6312a119918824959c257db2",
        itinerary: "63191e5019e820ede7918c5f"
    },
    {
        comment: "GREAT!!",
        user: "6312a13de68737e0c527a1bb",
        itinerary: "63191e5019e820ede7918c5e"
    }
]

ourComments.forEach(commentary => Comment.create(commentary));
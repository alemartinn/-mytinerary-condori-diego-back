const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    name: {type: String, required: true},
    photo: {type: String, required: true},
    itinerary: {type: String}
})

const Activity = mongoose.model(
    'activities', schema
);

module.exports = Activity;
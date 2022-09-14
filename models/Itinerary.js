const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    name: {type: String, required: true, min: 2, max:30},
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    city: {
        type: mongoose.Types.ObjectId,
        ref: 'cities'
    },
    price: {type: Number, required: true, min:0},
    likes: {type: Array, required: true},
    tags: {type: Array, required: true},
    duration: {type: Number, required: true, min:0, max:24}
});

const Itinerary = mongoose.model(
    'itineraries', schema
);
module.exports = Itinerary;

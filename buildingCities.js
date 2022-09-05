
require('dotenv').config();
const db = require('./config/database')

const Cities = require('./models/City');

Cities.create({
    city: "London2",
    country: "United Kingdom",
    photo: "https://w0.peakpx.com/wallpaper/977/956/HD-wallpaper-palace-of-westminster-london-houses-of-parliament-river-thames-westminster-bridge-westminster-abbey-evening-sunset-england.jpg",
    population: "30000",
    fundation: "08-21-2022"
});
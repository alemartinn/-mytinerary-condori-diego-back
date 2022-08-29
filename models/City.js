const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    city: {type: String, required: true},
    country: {type: String, required: true},
    photo: {type: String, required: true},
    population: {type: Number, minLenght: 1000, maxLenght: 100000000},
    fundation: {type: Date, required: true, length: 4}
});

const City = mongoose.model(
    //Nombre de coleccion
    'cities',
    //Esquema (Tabla) de datos
    schema
);

module.exports = City;
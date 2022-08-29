const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    city: {type: String, required: true},
    country: {type: String, required: true},
    photo: {type: String, required: true},
    population: {type: Number},
    fundation: {type: Date, required: true}
});

const City = mongoose.model(
    //Nombre de coleccion
    'cities',
    //Esquema (Tabla) de datos
    schema
);

module.exports = City;
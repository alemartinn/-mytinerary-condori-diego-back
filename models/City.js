const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    city: {type: String, required: true, min: 4, max:59},
    country: {type: String, required: true, min: 4, max:30},
    photo: {type: String, required: true,
        validate: function (value){
            if (!value.startsWith('http')) {
                throw new Error('Must start with http')
            }
        }},
    population: {type: Number, required: true, min:1000, max:1000000000},
    fundation: {type: Date, required: true, min:1000, max:2022}
});

const City = mongoose.model(
    //Nombre de coleccion
    'cities',
    //Esquema (Tabla) de datos
    schema
);

module.exports = City;
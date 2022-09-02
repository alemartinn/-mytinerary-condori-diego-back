const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    mail: {type: String, required: true},
    password: {type: String, required: true},
    photo: {type: String, required: true},
    country: {type: String, required: true}
});

const User = mongoose.model(
    //Nombre de coleccion
    'users',
    //Esquema (Tabla) de datos
    schema
);

module.exports = User;
const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGO_CONECTION,{
        useUnifiedTopology: true, //habilita a mongoose a controlar la MDB
        useNewUrlParser: true //usa el analizador de errores de moongose en lugar del de MONGO
})
.then(()=>console.log('connected to datebase successfully'))
.catch(error => console.log(error));

/* Una  vez configurada la conexion vamos a establecer la connexion con App.js */
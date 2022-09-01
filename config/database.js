const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGO_CONECTION,{
        useUnifiedTopology: true,
        useNewUrlParser: true
})
.then(()=>console.log('connected to datebase successfully'))
.catch(error => console.log(error));

/* Now we should get the conection with App.js*/
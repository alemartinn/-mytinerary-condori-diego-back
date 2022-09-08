
require('dotenv').config();
const db = require('./config/database');

const User = require('./models/User');

const ourUsers = [
    {name:"Ale", lastName:"Jandro",mail:"alejandro14@gmail.com",password:"1234",photo:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png", country:"Argentina"},
    {name:"Martin", lastName:"nnnnnn", mail:"martin14@gmail.com", password:"4321", photo:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png", country:"Argentina"},
    {name:"Diegotex", lastName:"Acuña", mail:"nahuel@gmail.com", password:"1111", photo:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png", country:"Argentina"}
];

ourUsers.forEach(element=>User.create(element));
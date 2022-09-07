
require('dotenv').config();
const db = require('./config/database')

const User = require('./models/User');

const ourUsers = [
    {name:"Ale", lastName:"Jandro",mail:"alejandro14@gmail.com",password:"1234",photo:"foto.jpg", country:"Argentina"},
    {name:"Martin", lastName:"nnnnnn", mail:"martin14@gmail.com", password:"4321", photo:"asasd.jpg", country:"Argentina"},
    {name:"Diegotex", lastName:"Acuña", mail:"nahuel@gmail.com", password:"1111", photo:"img.jpg", country:"Argentina"}
]

ourUsers.forEach((element)=>{
    User.create(element)
})
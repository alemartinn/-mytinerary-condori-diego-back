
require('dotenv').config();
const db = require('./config/database')

const User = require('./models/User');

for (let i = 0; i < 3; i++){
User.create({
    name: `MITYNER-${i+1}`,
    lastName: "martinnnn",
    mail: "alemartin@gmail.com",
    password: "1234",
    photo: "foto.jpg",
    country: "Argentina"
})
}
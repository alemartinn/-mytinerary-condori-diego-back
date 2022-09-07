
require('dotenv').config();
const db = require('./config/database');

const Cities = require('./models/City');

const ourCities = [
{city:"Barcelona", country:"Spain", photo:"https://w0.peakpx.com/wallpaper/360/360/HD-wallpaper-sagrada-familia-b...", population:20000, fundation:2022-08-20},
{city:"Marrakech", country:"Morocco", photo:"https://wallpaperaccess.com/full/2172000.jpg", population:2000, fundation: 2022-08-21},
{city:"Giza", country: "Egypt", photo:"https://www.wallpaperflare.com/static/214/673/146/egypt-pyramid-filter...", population: 15000, fundation:2022-08-22},
{city:"Siena", country:"Italy", photo:"http://academytravel5.com/wp-content/uploads/2019/03/siena.jpg", population:14000, fundation:2022-08-18},
{city:"Santorini", country:"Greece", photo:"https://fondosmil.com/fondo/62184.jpg", population:19000, fundation:2022-08-12},
{city:"Tokyo", country:"Japan", photo:"https://p4.wallpaperbetter.com/wallpaper/221/460/921/japan-tokyo-tower...", population:34000, fundation:2022-08-22},
{city:"Qatar", country:"Qatar", photo:"https://c.regencyholidays.com/blog/blog/content/images/2021/08/Places-...", population:32000, fundation:2022-08-21},
{city:"Dubai", country:"Dubai", photo:"https://wallpapersmug.com/download/3840x2400/f4068f/cityscape-aerial-v...", population:30000, fundation:2022-08-20},
{city:"Rome", country:"Italy", photo:"https://www.barcelo.com/guia-turismo/wp-content/uploads/2020/02/colise...", population:33000, fundation:2022-08-23},
{city:"Monaco", country:"Monaco", photo:"https://www.wallpapertip.com/wmimgs/39-392506_sunset-monaco-hd.jpg", population:23000, fundation:2022-08-21},
{city:"Paris",country:"France",photo:"https://w0.peakpx.com/wallpaper/354/534/HD-wallpaper-sunset-over-paris...",population:32000,fundation:2022-08-25},
{city:"London",country:"United Kingdom",photo:"https://w0.peakpx.com/wallpaper/977/956/HD-wallpaper-palace-of-westmin...",population:30000,fundation:2022-08-21}
];

ourCities.forEach(element=>Cities.create(element));

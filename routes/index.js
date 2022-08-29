var express = require('express');
var router = express.Router();

const userEvents = require('./users')
const eventRouter = require('./cities')

/* GET home page. */
router.get('/', function(req, res, next) {
  /*headers, body*/
  res.render('index', { title: 'MyTinerary' });
});


/* Va a unir todas las rutas en index */
router.use('/cities', eventRouter)
router.use('/users', userEvents)

module.exports = router;

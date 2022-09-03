var express = require('express');
var router = express.Router();

const userDefaultRouter = require('./usersDefault')
const cityRouter = require('./cities')
const user = require('./users')

/* GET home page. */
router.get('/', function(req, res, next) {
  /*headers, body*/
  res.render('index', { title: 'MyTinerary' });
});


/* Va a unir todas las rutas en index */
router.use('/cities', cityRouter)
router.use('/usersDefault', userDefaultRouter)
router.use('/users', user)

module.exports = router;

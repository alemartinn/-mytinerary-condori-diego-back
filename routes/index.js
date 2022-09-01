var express = require('express');
var router = express.Router();

const userRouter = require('./users')
const cityRouter = require('./cities')

/* GET home page. */
router.get('/', function(req, res, next) {
  /*headers, body*/
  res.render('index', { title: 'MyTinerary' });
});


/* Va a unir todas las rutas en index */
router.use('/cities', cityRouter)
router.use('/users', userRouter)

module.exports = router;

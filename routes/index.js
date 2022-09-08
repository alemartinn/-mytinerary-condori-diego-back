var express = require('express');
var router = express.Router();

const userDefaultRouter = require('./usersDefault');
const cityRouter = require('./cities');
const user = require('./users');
const itineraryRouter = require('./itineraries');
const activitiesRouter = require('./activities');
const comment = require('./comments');

/* GET home page. */
router.get('/', function(req, res, next) {
  /*headers, body*/
  res.render('index', { title: 'MyTinerary' });
});


/* Va a unir todas las rutas en index */
router.use('/cities', cityRouter);
router.use('/usersDefault', userDefaultRouter);
router.use('/users', user);
router.use('/itineraries', itineraryRouter);
router.use('/activities', activitiesRouter);
router.use('/comments', comment);


module.exports = router;

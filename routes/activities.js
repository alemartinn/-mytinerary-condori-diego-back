
var express = require('express');
var router = express.Router();

const {getAllActivities} = require('../controllers/activitiesController');

router.get('/', getAllActivities);

module.exports = router;

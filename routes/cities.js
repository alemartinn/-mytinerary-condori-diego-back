var express = require('express'); //metodo express
var router = express.Router();  //Trae un enrutador de express. Objeto.

// const eventController = require('../controllers/cityController');
const {create, read} = require('../controllers/cityController');

/* GET users listing. */

/*Le agregamos un metodo para que controle el controlador (de cities en este caso)*/
// router.post('/events', eventController.create);
router.post('/', create);
router.get('/:id', read);

module.exports = router;

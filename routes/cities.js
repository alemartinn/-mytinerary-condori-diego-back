var express = require('express'); //metodo express
var router = express.Router();  //Trae un enrutador de express. Objeto.

// const cityController = require('../controllers/cityController');
const {createCity, readAll, readCity, updateCity, deleteCity} = require('../controllers/cityController');

/* GET users listing. */

/*Le agregamos un metodo para que controle el controlador (de cities en este caso)*/
// router.post('/cities', cityController.create);
router.post('/', createCity);
router.get('/', readAll);
router.get('/:id', readCity);
router.put('/:id', updateCity);
router.delete('/:id', deleteCity);

module.exports = router;

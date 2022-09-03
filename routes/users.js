var express = require('express');
var router = express.Router();

const {createUser, readUser, updateUser, deleteUser} = require('../controllers/userController');

router.post('/', createUser);
router.get('/:id', readUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
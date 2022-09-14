var express = require('express');
var router = express.Router();

const {createUser, readUser, updateUser, deleteUser, signUp} = require('../controllers/userController');

router.post('/', signUp);
// router.post('/', createUser);
router.get('/:id', readUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
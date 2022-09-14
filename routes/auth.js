var express = require('express');
var router = express.Router();

const {createUser, readUser, updateUser, deleteUser, signUp, signOut} = require('../controllers/userController');

router.post('/', signUp);
// router.post('/', createUser);
router.post('/:id', signOut)
router.get('/:id', readUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
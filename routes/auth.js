var express = require('express');
var router = express.Router();

const { signUp, verifyMail, signIn, signOut, updateUser, myFavorites } = require('../controllers/userController');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.get('/verify/:code', verifyMail);
router.patch('/updateuser/:id', updateUser);
router.patch('/favorites/:id', myFavorites)

module.exports = router;
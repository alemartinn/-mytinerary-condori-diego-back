var express = require('express');
const passport = require('passport');
var router = express.Router();

const { signUp, verifyMail, signIn, signOut, updateUser, verifyToken } = require('../controllers/userController');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.get('/verify/:code', verifyMail);
router.patch('/updateuser/:id', updateUser);
router.get('/verifytoken', passport.authenticate('jwt', {session:false}), verifyToken);

module.exports = router;
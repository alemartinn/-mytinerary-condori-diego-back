var express = require('express');
var router = express.Router();
const passport = require('../config/passport');

const { createComment, getAllComments, getComment, updateComment, deleteComment} = require('../controllers/commentController');

router.post('/', passport.authenticate('jwt', {session:false}), createComment);
router.get('/', getAllComments);
router.get('/:id', getComment);
router.patch('/:id', updateComment);
router.patch('/:id', deleteComment)

module.exports = router
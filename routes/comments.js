var express = require('express');
var router = express.Router();
const { createComment, getAllComments, getComment, updateComment, deleteComment} = require('../controllers/commentController');

router.post('/', createComment);
router.get('/', getAllComments);
router.get('/:id', getComment);
router.patch('/:id', updateComment);
router.patch('/:id', deleteComment)

module.exports = router
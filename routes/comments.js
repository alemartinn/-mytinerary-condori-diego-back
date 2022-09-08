var express = require('express');
var router = express.Router();
const { createComment, getAllComments, getComment} = require('../controllers/commentController');

router.post('/', createComment);
router.get('/', getAllComments);
router.get('/:id', getComment);

module.exports = router
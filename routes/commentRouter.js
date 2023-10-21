const express = require('express');
const router = express.Router();
const userExtractor = require('../middleware/userExtractor');
const { deleteComment } = require('../controllers/commentController');

router.route('/:id').delete(userExtractor, deleteComment);

module.exports = router;

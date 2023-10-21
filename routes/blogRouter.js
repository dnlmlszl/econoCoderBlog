const express = require('express');
const router = express.Router();
const userExtractor = require('../middleware/userExtractor');
const {
  getComments,
  createComment,
} = require('../controllers/commentController');

const {
  getBlogs,
  createBlog,
  getSingleBlog,
  deleteBlog,
  updateBlog,
} = require('../controllers/blogController');

router.route('/').post(userExtractor, createBlog).get(getBlogs);
router
  .route('/:id')
  .get(getSingleBlog)
  .delete(userExtractor, deleteBlog)
  .patch(userExtractor, updateBlog);

router
  .route(':id/comments')
  .post(userExtractor, createComment)
  .get(userExtractor, getComments);

module.exports = router;

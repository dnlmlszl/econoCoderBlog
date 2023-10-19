const express = require('express');
const router = express.Router();
const userExtractor = require('../middleware/userExtractor');

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
  .get(userExtractor, getSingleBlog)
  .delete(userExtractor, deleteBlog)
  .patch(userExtractor, updateBlog);

module.exports = router;

const Comment = require('../models/Comment');
const { StatusCodes } = require('http-status-codes');
const { getIo } = require('../utils/socket');
const Blog = require('../models/Blog');

const getComments = async (req, res) => {
  const blogId = req.params.id;
  const comments = await Comment.find({ blog: blogId }).populate('user', {
    username: 1,
    name: 1,
  });

  res.status(StatusCodes.OK).json(comments);
};

const createComment = async (req, res) => {
  const body = req.body;
  const blogId = req.params.id;
  const io = getIo();

  const comment = new Comment({
    content: body.content,
    blog: blogId,
    user: req.user.username,
  });

  const savedComment = await comment.save();
  io.emit('commentCreated', { blogId: blogId, comment: savedComment });

  const blog = await Blog.findById(blogId);
  if (blog) {
    blog.comments.push(savedComment.id);
    await blog.save();
  }

  res.status(StatusCodes.CREATED).json(savedComment);
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  await Comment.findByIdAndRemove(commentId);

  res.status(StatusCodes.NO_CONTENT).end();
};

module.exports = { getComments, createComment, deleteComment };

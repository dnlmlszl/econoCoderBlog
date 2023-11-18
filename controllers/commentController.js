const Comment = require('../models/Comment');
const { StatusCodes } = require('http-status-codes');
const { getIo } = require('../utils/socket');
const Blog = require('../models/Blog');
const User = require('../models/User');

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

  const user = await User.findOne({ username: req.user.username });

  if (user) {
    user.comments.push(savedComment.id);
    await user.save();
  }

  res.status(StatusCodes.CREATED).json(savedComment);
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  const comment = await Comment.findById(commentId);

  if (!comment) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: 'Comment not found' });
  }

  await Comment.findByIdAndRemove(commentId);

  const user = await User.findOne({ username: req.user.username });

  if (user) {
    user.comments = user.comments.filter((com) => com.id !== comment.commentId);
    await user.save();
  }

  const blog = await Blog.findById(comment.blog);
  if (blog) {
    blog.comments = blog.comments.filter((com) => com.toString() !== commentId);
    await blog.save();
  }

  res.status(StatusCodes.NO_CONTENT).end();
};

module.exports = { getComments, createComment, deleteComment };

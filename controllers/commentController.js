const Comment = require('../models/Comment');
const { StatusCodes } = require('http-status-codes');
const { getIo } = require('../utils/socket');

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

  const comment = new Comment({
    content: body.content,
    blog: blogId,
    user: req.user.id,
  });

  const savedComment = await comment.save();

  res.status(StatusCodes.CREATED).json(savedComment);
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  await Comment.findByIdAndRemove(commentId);

  res.status(StatusCodes.NO_CONTENT).end();
};

module.exports = { getComments, createComment, deleteComment };

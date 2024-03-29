const Blog = require('../models/Blog');
const User = require('../models/User');
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { getIo } = require('../utils/socket');

const getBlogs = async (req, res) => {
  const blogs = await Blog.find({})
    .populate('comments')
    .populate('user', { username: 1, name: 1 });

  res.status(StatusCodes.OK).json({ blogs, count: blogs.length });
};

const createBlog = async (req, res) => {
  const body = req.body;
  const io = getIo();

  const decodedToken = jwt.verify(req.cookies.accessToken, process.env.SECRET);

  if (!decodedToken.id) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Invalid token' });
  }

  if (!body.likes) {
    body.likes = 0;
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'user not found' });
  }

  if (!body.title || !body.url) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Please provide title and / or url' });
  }

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  const populatedBlog = await Blog.findById(savedBlog.id).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });

  io.emit('blogCreated', { newBlog: populatedBlog });

  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  res.status(StatusCodes.CREATED).json(populatedBlog);
};

const getSingleBlog = async (req, res) => {
  const { id } = req.params;

  const decodedToken = jwt.verify(req.cookies.accessToken, process.env.SECRET);

  if (!decodedToken.id) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Invalid token' });
  }

  const blog = await Blog.findById(id)
    .populate('comments')
    .populate('user', { username: 1 });

  if (!blog) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Blog not found.' });
  }
  console.log(blog);
  res.status(StatusCodes.OK).json(blog);
};

const deleteBlog = async (req, res) => {
  const { id: blogId } = req.params;
  const io = getIo();
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Blog not found.' });
  }

  const decodedToken = jwt.verify(req.cookies.accessToken, process.env.SECRET);

  if (!decodedToken.id) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Token missing or invalid' });
  }

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: 'Only the creator has the access to delete a blog' });
  }
  const commentsToDelete = await Comment.find({ blog: blogId });

  await Comment.deleteMany({ blog: blogId });

  const userId = blog.user;
  const user = await User.findById(userId);

  if (user) {
    const commentIdsToDelete = commentsToDelete.map((comment) =>
      comment._id.toString()
    );
    user.comments = user.comments.filter(
      (commentId) => !commentIdsToDelete.includes(commentId.toString())
    );

    user.blogs = user.blogs.filter((b) => b.toString() !== blogId);

    await user.save();
  }

  await blog.deleteOne();
  io.emit('blogDeleted', { blogId: blogId });

  res.status(StatusCodes.NO_CONTENT).end();
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { likes } = req.body;
  const userId = req.user.id;
  const io = getIo();

  if (typeof likes !== 'number') {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'likes must be a number' });
  }

  try {
    const updatedBlog = await Blog.findById(id);
    if (!updatedBlog) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'blog not found' });
    }

    if (!updatedBlog.likedBy.includes(userId)) {
      updatedBlog.likes += 1;
      updatedBlog.likedBy.push(userId);
      await updatedBlog.save();

      io.emit('blogLiked', { blogId: id, likes: updatedBlog.likes });
    }

    res.status(StatusCodes.OK).json(updatedBlog);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = {
  getBlogs,
  createBlog,
  getSingleBlog,
  deleteBlog,
  updateBlog,
};

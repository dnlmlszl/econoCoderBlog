const Blog = require('../models/Blog');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.status(StatusCodes.OK).json({ blogs, count: blogs.length });
};

const createBlog = async (req, res) => {
  const body = req.body;

  const decodedToken = jwt.verify(req.token, process.env.SECRET);

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

  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  res.status(StatusCodes.CREATED).json(savedBlog);
};

const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findOne({ id });

  if (!blog) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Blog not found.' });
  }

  res.status(StatusCodes.OK).json(blog);
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Blog not found.' });
  }

  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Token missing or invalid' });
  }

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: 'Only the creator has the access to delete a blog' });
  }

  await blog.deleteOne();
  res.status(StatusCodes.NO_CONTENT).end();
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, author, url, likes } = req.body;

  if (typeof likes === 'number') {
    blog.likes = likes;
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'likes must be a number' });
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'blog not found' });
  }

  blog.likes = likes;

  const updatedBlog = await blog.save();
  res.status(StatusCodes.OK).json(updatedBlog);
};

module.exports = {
  getBlogs,
  createBlog,
  getSingleBlog,
  deleteBlog,
  updateBlog,
};

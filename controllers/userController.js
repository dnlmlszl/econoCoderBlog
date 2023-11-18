const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const getAllUsers = async (req, res) => {
  const users = await User.find({})
    .populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
      role: 1,
    })
    .populate('comments');

  res.status(StatusCodes.OK).json(users);
};

const getMe = async (req, res) => {
  let decodedToken;
  try {
    decodedToken = jwt.verify(req.cookies.accessToken, process.env.SECRET);
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid or expired token' });
  }

  if (!decodedToken.id) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid credentials' });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
  }

  res.status(StatusCodes.OK).json({
    username: user.username,
    name: user.name,
    email: user.email,
    role: user.role,
    id: user.id,
  });
};

module.exports = { getAllUsers, getMe };

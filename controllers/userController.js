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

const getSingleUser = async (req, res) => {
  const { id } = req.params;

  let decodedToken;
  try {
    decodedToken = jwt.verify(req.cookies.accessToken, process.env.SECRET);
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Invalid or expired token' });
  }

  if (!decodedToken.id || decodedToken.role !== 'admin') {
    return res.status(StatusCodes.FORBIDDEN).json({ error: 'Access denied' });
  }

  const user = await User.findById(id)
    .populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
      role: 1,
    })
    .populate('comments');

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
  }

  res.status(StatusCodes.OK).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, username } = req.body;

  let decodedToken;
  try {
    decodedToken = jwt.verify(req.cookies.accessToken, process.env.SECRET);
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid or expired token' });
  }

  if (!decodedToken.id || decodedToken.role !== 'admin') {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized to update user' });
  }

  const user = await User.findByIdAndUpdate(
    id,
    { name, username },
    { new: true }
  );

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
  }

  res.status(StatusCodes.OK).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  let decodedToken;
  try {
    decodedToken = jwt.verify(req.cookies.accessToken, process.env.SECRET);
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid or expired token' });
  }

  if (!decodedToken.id || decodedToken.role !== 'admin') {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized to update user' });
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
  }

  res.status(StatusCodes.NO_CONTENT).end();
};

module.exports = { getAllUsers, getMe, getSingleUser, updateUser, deleteUser };

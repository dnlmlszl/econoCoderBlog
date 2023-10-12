const bcrypt = require('bcrypt');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });

  res.status(StatusCodes.OK).json(users);
};

const createUser = async (req, res) => {
  const { username, name, password } = req.body;

  if (!username || username.length < 3) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Username is required and must be at least 3 characters long',
    });
  }

  if (!password || password.length < 3) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Password is required and must be at least 3 characters long',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(StatusCodes.CREATED).json(savedUser);
};

module.exports = { getAllUsers, createUser };

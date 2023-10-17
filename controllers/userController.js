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

module.exports = { getAllUsers };

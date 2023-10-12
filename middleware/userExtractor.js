const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { getTokenFrom } = require('../utils/getTokenFrom');

const userExtractor = async (req, res, next) => {
  const token = getTokenFrom(req);

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Token missing' });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Token invalid' });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Token is valid but user not found' });
  }

  req.user = user;
  next();
};

module.exports = userExtractor;

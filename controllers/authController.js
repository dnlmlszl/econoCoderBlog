const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Please provide email and password' });
  }

  const user = await User.findOne({ email });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Invalid email or password' });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  res.status(StatusCodes.OK).send({
    token,
    username: user.username,
    name: user.name,
    email: user.email,
    id: user.id,
  });
};

const registerUser = async (req, res) => {
  const { email, username, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  const usernameAlreadyExists = await User.findOne({ username });

  if (emailAlreadyExists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Email already exists' });
  }

  if (usernameAlreadyExists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Username already exists' });
  }

  if (!name || name.length < 3) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Username is required and must be at least 3 characters long',
    });
  }

  if (!password || password.length < 3) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Password is required and must be at least 3 characters long',
    });
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
    email,
    role,
  });

  const savedUser = await user.save();

  res.status(StatusCodes.CREATED).json({
    id: savedUser.id,
    username: savedUser.username,
    name: savedUser.name,
    email: savedUser.email,
    role: savedUser.role,
  });
};

module.exports = { loginUser, registerUser };

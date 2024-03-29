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
    role: user.role,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  const refreshToken = jwt.sign(
    userForToken,
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d', // 7 days
    }
  );

  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000,
    sameSite: 'lax',
  });

  res.status(StatusCodes.OK).send({
    refreshToken,
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

  //
  const userForToken = {
    username: savedUser.username,
    role: savedUser.role,
    id: savedUser.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  const refreshToken = jwt.sign(
    userForToken,
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d', // 7 days
    }
  );
  //
  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000,
    sameSite: 'lax',
  });

  res.status(StatusCodes.CREATED).json({
    id: savedUser.id,
    username: savedUser.username,
    name: savedUser.name,
    email: savedUser.email,
    role: savedUser.role,
    refreshToken,
  });
};

const logoutUser = async (req, res) => {
  res.cookie('accessToken', '', { expires: new Date(0) });

  res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
};

const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Refresh token not provided' });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Refresh token expired or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const newAccessToken = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  res.cookie('accessToken', newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000,
    sameSite: 'lax',
  });

  res.status(StatusCodes.OK).end();
};

module.exports = { loginUser, registerUser, logoutUser, refreshToken };

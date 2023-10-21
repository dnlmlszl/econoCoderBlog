const express = require('express');
const router = express.Router();

const {
  loginUser,
  registerUser,
  refreshToken,
  logoutUser,
} = require('../controllers/authController');

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/logout').post(logoutUser);
router.route('/refresh-token').post(refreshToken);

module.exports = router;

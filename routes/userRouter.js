const express = require('express');
const router = express.Router();

const { getAllUsers, getMe } = require('../controllers/userController');

router.route('/').get(getAllUsers);
router.route('/me').get(getMe);

module.exports = router;

const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getMe,
  getSingleUser,
} = require('../controllers/userController');

router.route('/').get(getAllUsers);
router.route('/me').get(getMe);
router.route('/:id').get(getSingleUser);

module.exports = router;

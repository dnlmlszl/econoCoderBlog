const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getMe,
  getSingleUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.route('/').get(getAllUsers);
router.route('/me').get(getMe);
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;

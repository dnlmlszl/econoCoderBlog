const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: [true, 'Please provide nickname'],
    unique: true,
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: [true, 'Please provide username'],
  },
  passwordHash: {
    type: String,
    minlength: 3,
    required: [true, 'Please provide password'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide an email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'visitor'],
    default: 'user',
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

UserSchema.plugin(uniqueValidator);

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

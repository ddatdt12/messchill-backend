const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { validateEmail } = require('../utils/validate');

const UserSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    signInProvider: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      validate: [validateEmail, 'Please fill a valid email address'],
    },
    name: {
      type: String,
      required: [true, 'Please enter a name'],
      maxlength: 30,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  dni: {
    type: String,
    required: [true, 'DNI is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
});

module.exports = mongoose.model('UserSchema', userSchema);
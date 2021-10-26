const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: Number,
    unique: [true, 'user id already exists'],
    required: [true, 'ID missing for user'],
  },
  name: {
    type: String,
    required: [true, 'Name missing for user'],
  },
  assignUsers: {
    type: Array,
    default: [],
  },
  debt: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('users', userSchema);


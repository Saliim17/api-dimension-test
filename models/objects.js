const mongoose = require('mongoose');

const { Schema } = mongoose;

const objectSchema = new Schema({
  id: {
    type: Number,
    unique: [true, 'Object id already exists'],
    required: [true, 'ID missing for object'],
  },
  name: {
    type: String,
    required: [true, 'Name missing for object'],
  },
  assignObjects: {
    type: Array,
    default: [],
  },
  debt: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('object', objectSchema);


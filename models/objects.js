const mongoose = require('mongoose');

const { Schema } = mongoose;

const objectSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: [true, 'ID es obligatorio'],
  },
  name: {
    type: String,
    required: [true, 'Name missing for object'],
    unique: true,
  },
  descripcion: {
    type: String,
  },
  precio: {
    type: Number,
    default: 0.0,
    required: [true, 'Falta precio de producto'],
  },
  imagen: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('object', objectSchema);

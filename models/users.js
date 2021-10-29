const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name missing for user'],
  },
  correo: {
    type: String,
    required: [true, 'Email es necasario'],
    unique: true,
  },
  contraseña: {
    type: String,
    required: [true, 'Contraseña es necesario'],
  },
});

module.exports = mongoose.model('users', userSchema);


const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name missing for user'],
  },
  correo: {
    type: String,
    required: [true, 'Email is necessary'],
    unique: true,
  },
  historial_ganancias: {
    cantidad_puntos: {
      type: Number,
      default: 0,
    },
    fecha_obtencion: {
      type: Number,
      default: 0,
    },
  },
  historial_gastos: {
    cantidad_puntos: {
      type: Number,
      default: 0,
    },
    fecha_obtencion: {
      type: Number,
      default: 0,
    },
  }
});

module.exports = mongoose.model('users', userSchema);


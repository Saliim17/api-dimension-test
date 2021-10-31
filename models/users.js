const mongoose = require('mongoose');

const { Schema } = mongoose;

const ganancias = new Schema({
  id_actividad: {
    type : Number
  },
  cantidad_puntos: {
    type: Number,
    default: 0,
  },
  fecha_obtencion: {
    type: Number,
    default: 0,
  },
})

const gastos = new Schema({
  id_objeto: {
    type : Number
  },
  cantidad_puntos: {
    type: Number,
    default: 0,
  },
  fecha_obtencion: {
    type: Number,
    default: 0,
  },
})

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name missing for user'],
    unique: true
  },
  correo: {
    type: String,
    required: [true, 'Email is necessary'],
    unique: true,
  },
  historial_ganancias: [ganancias],
  historial_gastos: [gastos]
});



module.exports = mongoose.model('users', userSchema);


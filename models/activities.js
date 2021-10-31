const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: [true, 'ID missing for activity'],
  },
  name: {
    type: String,
    required: [true, 'Name missing for activity'],
  },
  descripcion: String,
  imagen: String,
  moneda: {
    type:String,
    required: true,
    default: "Corepuntos"
  },
  puntosPorDefecto: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('activities', activitySchema);


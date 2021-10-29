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
  descripcion: {
    type: String,
    required: [true, 'Se necesita una descripcion'],
    unique: true,
  },
  organizacion: {
    type: String,
    required: [true, 'Se necesita una organizacion'],
  },
  imagen: {
    type: String,
    required: [true, 'Se necesita una imagen'],
  }

});

module.exports = mongoose.model('activities', activitySchema);


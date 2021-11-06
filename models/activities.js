const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
  id: {
    type: Number,
    unique: true,
    inmutable: true,
    required: [true, 'ID missing for activity'],
  },
  name: {
    type: String,
    required: [true, 'Name missing for activity'],
  },
  description: {
    type: String,
  },
  picture: {
    type: String,
  },
  coin: {
    type:String,
    required: true,
    default: "Corepuntos"
  },
  defaultPoints: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('Activity', activitySchema);


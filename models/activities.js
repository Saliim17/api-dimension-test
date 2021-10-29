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
});

module.exports = mongoose.model('activities', activitySchema);


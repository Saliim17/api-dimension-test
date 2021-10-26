const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
  id: {
    type: Number,
    unique: [true, 'Activity id already exists'],
    required: [true, 'ID missing for activity'],
  },
  name: {
    type: String,
    required: [true, 'Name missing for activity'],
  },
  assignActivities: {
    type: Array,
    default: [],
  },
  debt: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('activities', activitySchema);


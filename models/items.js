const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    inmutable: true,
    required: [true, 'Item ID is required'],
  },
  name: {
    type: String,
    required: [true, 'Name missing for item'],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: 0.0,
    required: [true, 'Price missing for item'],
  },
  picture: {
    type: String,
  },
  coinType: {
    type: String,
    required: [true, 'Coin type missing for item'],
  },
  stock: {
    type: Number,
    default: 0,
  },
  canBeBoughtMultipleTimes: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Item', itemSchema);

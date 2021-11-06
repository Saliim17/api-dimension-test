const mongoose = require('mongoose');

const { Schema } = mongoose;

const earnings = new Schema({
  id_activity: {
    inmutable: true,
    type: Number,
  },
  coin: {
    type:String,
    required: true,
    default: "Corepuntos"
  },
  points: Number,
  dateObtaining: {
    type:Date,
    default: Date.now
  }
})

const expenses = new Schema({
  id_item: {
    type: Number,
    inmutable: true,

  },
  coin: {
    type:String,
    required: true,
    default: "Corepuntos"
  },
  points: Number,
  dateObtaining: {
    type:Date,
    default: Date.now
  }
})

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name missing for user'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email is necessary'],
    unique: true,
  },
  earnings_history: [earnings],
  expenses_history: [expenses],
  balance: {
    type: Number,
    default: 0,
  }
});



module.exports = mongoose.model('User', userSchema);


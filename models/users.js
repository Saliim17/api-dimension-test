const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    unique: true,
    minlength: 5,
    maxlength: 50
  },
  imageProfile: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is necessary'],
    unique: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: [true, 'Password is necessary'],
    select: false,
  },
  signUpDate: { 
    type: Date, 
    default: Date.now() 
  },
  earnings_history: [earnings],
  expenses_history: [expenses],
  balance: {
    type: Number,
    default: 0,
  }
}, 
{
  timestamps: true,
  versionKey: false,
});

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;



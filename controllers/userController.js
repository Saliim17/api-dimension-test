const User = require('../models/users.js');
const Activity = require('../models/activities.js').default;
const Item = require('../models/items.js');
const passport = require('passport');
const bcrypt = require('bcrypt');
const token = require('../middleware/auth');

function getUsers(req, res) { // GET all users
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({ err });

    return res.status(200).send(users);
  });
}

function getUserByEmail(req, res) { // GET user by EMAIL
  const { userId } = req.params;
  User.findOne({email:userId}, (err, user) => {
    if (err) return res.status(500).send({ message: `Error ${err}.` });
    if (!user) return res.status(404).send({ Error: `Error. No users found` });
    return res.status(200).send(user);
  });
}

const createUser = async (req, res) => { // POST user
  const { name, email, password, confirm_password } = req.body
  
  if (!name || !email || !password || !confirm_password) {
    return res.status(403).send({ message: `Missing credentials` });
  }
  if (password != confirm_password) {
    return res.status(401).send({ message: `Password do not match` });
  }
  if (password.length < 4) {
    return res.status(411).send({ message: `Passwords must be at least 4 characters.` });
  }
  // Look for email coincidence
  let emailConfirm = await User.findOne({ email });
  if (emailConfirm) 
    return res.status(401).send({ message: `The email is already in use.`});
  else {
    // Saving a New User
    const newUser = new User({ name, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    return res.status(200).send({ message: `You are registered.`});
  }
}

function logUser (req, res) { //POST user
  let { email, password } = req.body
  // Find the user
  User.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send({ err });
    if (!user) return res.status(404).send({ message: 'No user found' });
    // User exists, check if password is correct
    bcrypt.compare(password, user.password, (error, isMatch) => {
      if (error) return res.status(500).send({ error });
      if (!isMatch) return res.status(401).send({ message: 'Incorrect password' });
      return res.status(200).send({ message: 'Correct password', token: token.createToken(email) });
    });
  });
}

function deleteUser(req, res) { // DELETE user
  const { userId } = req.params;

  User.findOneAndDelete({email:userId}, (err, user) => {
    if (err) return res.status(500).send({ err });
    if (!user) return res.status(404).send({ message: 'User not found!' });

    return res.status(200).send({ message: `User deleted successfully!` }); 
  });
}

function updateUser(req, res) { // PATCH user
  const { userId } = req.params;

  User.findOneAndUpdate({email:userId}, req.body, (err, user) => {
    if (!user) return res.status(404).send({message: 'User not found'});
    if (err) return res.status(500).send({ err });

    return res.status(200).send({ message: `User ${user} updated` });
  });
}

function participateInEvent(req, res) { // POST larguisimo pero weno jajaja
  const { userId } = req.params;

  // Si hay campo activity en el body,
  if (req.body.activity !== undefined){
    // Busca la activity para asegurarse de que existe (si no existe, no hay trazabilidad -> puntos fantasma.)
    Activity.findOne({id:req.body.activity}, (err, act) =>{
      if (err) return res.status(500).send({err});
      if (!act) return res.status(404).send(`Activity with id ${req.body.activity} not found. Please, create it first.`);
      
      //La actividad existe; añadir la moneda correspondiente al usuario.
      var points = act.defaultPoints;
      if (req.body.points !== undefined)
        points = req.body.points;
      // Hay que comprobar si el usuario ya ha participado en una actividad con esa id antes de añadirlo al array.
      
      User.findOne({email:userId}, (err, user) => {
        if (err) return res.status(500).send({ message: `Error ${err}.` });
        if (!user) return res.status(404).send({ Error: `Error. User with email ${userId} not found.` });

        for (var key in user.earnings_history){
          if (user.earnings_history[key].id_activity == req.body.activity){
            return res.status(403).send({message: 'Error. User already participated in that activity'})
          }
        }
        // Actualizamos al usuario añadiendole al array de ganancias la nueva actividad.
        User.findOneAndUpdate({email:userId}, 
          { $push:
            { earnings_history:
              {
                id_activity:req.body.activity,
                coin:act.coin,
                points:points
              }
            }
          }, (err, user) => {
            if (err) return res.status(500).send({ message: `Error ${err}.` });
            if (!user) return res.status(404).send({ Error: `Error. User with email ${userId} not found.` });
      
            // USUARIO ENCONTRADO - Añadir participación.
            return res.status(200).send({message: 'Activity added succesfully.'});

        });
      })

      

    })
  }
  else return res.status(400).send({message: 'Bad request. Please, include the field "activity"'})
} 

function getCurrency(req, res) { // Devuelve la cantidad de monedas del tipo X del usuario Y
  const { userId } = req.params;
  let { currency } = req.params;
  console.log(userId + " " + currency);

  User.findOne({email: userId}, (err, user) => {
    if (err) return res.status(500).send({ message: `Error ${err}.` });
    if (!user) return res.status(404).send({ Error: `Error. User with email ${userId} not found.` });
    var balance = 0;
    // SUMAR GANANCIAS
    for (let i in user.earnings_history){
      let earnings = user.earnings_history[i];
      if (earnings.coin === currency) {
        balance += earnings.coin;
      }
    }
    // RESTAR PERDIDAS
    for (let i in user.expenses_history){
      let expenses = user.expenses_history[i];
      if (expenses.coin === currency) {
        balance -= expenses.coin;
      }
    }

    return res.status(200).send({balance: balance});  //balance: 20
  });
}

module.exports = {
  getUsers,
  getUserByEmail,
  createUser,
  deleteUser,
  updateUser,
  participateInEvent,
  getCurrency,
  logUser,
};

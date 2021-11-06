const User = require('../models/users.js');
const Activity = require('../models/activities.js').default;
const Item = require('../models/items.js');

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

function createUser(req, res) { // POST user
  const newUser = new User(req.body);
  newUser.save((err, newUserData) => {
    if (err) return res.status(400).send({ message: `Error ${err}. User creation failed!` });
    return res.status(200).send(newUserData);
  });
}

function deleteUser(req, res) { // DELETE user
  const { userId } = req.params;

  User.findOneAndDelete({email:userId}, (err, user) => {
    if (err) return res.status(500).send({ err });
    if (!user) return res.status(404).send({ message: 'User not found!' });

    return res.status(200).send({ message: `User ${user} deleted successfully!` });
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


function buyItem(req, res) { 
  /*
  1. Comprobar si el usuario existe.
  2. Comprobar el tipo de moneda del objeto
  3. Comprobar si el usuario tiene monedas de ese tipo
  4. Comprobar si su saldo es mayor que el coste del objeto
  5. Actualizar saldo
  6. Actualizar stock
  */

  const { userId } = req.params;
  const { itemId } = req.params;
  let { stock } = req.params;

  User.findOne({email: userId}, (err, user) => {
    if (err) return res.status(500).send({ message: `Error ${err}.` });
    if (!user) return res.status(404).send({ Error: `Error. User with email ${userId} not found.` });
    stock = Item.checkItemStock(itemId);
    if (stock == 0) 
      return res.status(404).send({ Error: `Error. Item with ID ${itemId} has not an available stock.` });
    
  });
}

module.exports = {
  getUsers,
  getUserByEmail,
  createUser,
  deleteUser,
  updateUser,
  participateInEvent,
  getCurrency
};

const User = require('../models/users.js');
const Activity = require('../models/activities.js');

function getUsers(req, res) { // GET all users
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({ err });

    return res.status(200).send(users);
  });
}

function getUserByEmail(req, res) { // GET user by EMAIL
  const { userId } = req.params;
  User.findOne({correo:userId}, (err, user) => {
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

  User.findOneAndDelete({correo:userId}, (err, user) => {
    if (err) return res.status(500).send({ err });
    if (!user) return res.status(404).send({ message: 'User not found!' });

    return res.status(200).send({ message: `User ${user} deleted successfully!` });
  });
}

function updateUser(req, res) { // PATCH user
  const { userId } = req.params;

  User.findOneAndUpdate({correo:userId}, req.body, (err, user) => {
    if (!user) return res.status(404).send({message: 'User not found'});
    if (err) return res.status(500).send({ err });

    return res.status(200).send({ message: `User ${user} updated` });
  });
}

function participarEnEvento(req, res) { // POST larguisimo pero weno jajaja
  const { userId } = req.params;

  // Si hay campo activity en el body,
  if (req.body.activity !== undefined){
    // Busca la activity para asegurarse de que existe (si no existe, no hay trazabilidad -> puntos fantasma.)
    Activity.findOne({id:req.body.activity}, (err, act) =>{
      if (err) return res.status(500).send({err});
      if (!act) return res.status(404).send(`Activity with id ${req.body.activity} not found. Please, create it first.`);
      
      //La actividad existe; añadir la moneda correspondiente al usuario.
      var puntos = act.puntosPorDefecto;
      if (req.body.puntos !== undefined)
        puntos = req.body.puntos;
      // Hay que comprobar si el usuario ya ha participadfo en una actividad con esa id antes de añadirlo al array.
      
      User.findOne({correo:userId}, (err, user) => {
        if (err) return res.status(500).send({ message: `Error ${err}.` });
        if (!user) return res.status(404).send({ Error: `Error. User with email ${userId} not found.` });

        for (var key in user.historial_ganancias){
          if (user.historial_ganancias[key].id_actividad == req.body.activity){
            return res.status(403).send({message: 'Error. User already participated in that activity'})
          }
        }
        // Actualizamos al usuario añadiendole al array de ganancias la nueva actividad.
        User.findOneAndUpdate({correo:userId}, 
          { $push:
            { historial_ganancias:
              {
                id_actividad:req.body.activity,
                moneda:act.moneda,
                puntos:puntos
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
  var userId = req.params.userId;
  var currency = req.params.currency;
  console.log(userId + " " + currency);

  User.findOne({correo: userId}, (err, user) => {
    if (err) return res.status(500).send({ message: `Error ${err}.` });
    if (!user) return res.status(404).send({ Error: `Error. User with email ${userId} not found.` });
    var saldo = 0;
    // SUMAR GANANCIAS
    for (var i in user.historial_ganancias){
      var ganancia = user.historial_ganancias[i];
      if (ganancia.moneda === currency) {
        saldo += ganancia.puntos;
      }
    }
    // RESTAR PERDIDAS
    for (var i in user.historial_gastos){
      var gasto = user.historial_gastos[i];
      if (gasto.moneda === currency) {
        saldo -= gasto.puntos;
      }
    }

    return res.status(200).send({saldo: saldo});
  });
}

module.exports = {
  getUsers,
  getUserByEmail,
  createUser,
  deleteUser,
  updateUser,
  participarEnEvento,
  getCurrency
};

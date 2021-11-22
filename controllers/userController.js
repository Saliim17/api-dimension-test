const User = require('../models/users.js');
const Activity = require('../models/activities.js');
const Item = require('../models/items.js');
const bcrypt = require('bcryptjs');
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
  const { name, email, password } = req.body
  
  if (!name || !email || !password ) {
    return res.status(403).send({ message: `Missing credentials` });
  }
  if (password.length < 4) {
    return res.status(411).send({ message: `Passwords must be at least 4 characters.` });
  }

  // Saving a New User
  const newUser = new User({ name, email, password });
  await newUser.save();
  return res.status(200).send({ message: `You are registered.`, token: token.createToken(newUser.email)});
}

const logUser = async (req, res) => {
	const { email, password } = req.body
  const user = await User.findOne({ email }, "+password")

	if (user && (await user.matchPassword(password))) 
		return res.status(200).json({message: 'You are successfully logged.',  token: token.createToken(user.email)});
  else 
		return res.status(401).json({message: 'Wrong email or password.'});
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

function purchaseItem(req, res) {
  const { email } = req.params;
  const { itemId } = req.params;

  User.findOne({email:email}, (err, user) => {
    if (err) return res.status(500).send({ message: `Error ${err}.` });
    if (!user) return res.status(404).send({ Error: `Error. User with email ${email} not found.` });

    // Usuario encontrado; ahora hay que comprobar que objeto intenta comprar y con qué moneda se compra dicho objeto.

    Item.findOne({id:itemId}, (err, item) => {
      if (err) return res.status(500).send({ message: `Error ${err}.` });
      if (!item) return res.status(404).send({ Error: `Error. Item with id ${itemId} not found.` });

      var balance = getCurrencyAux(user, item.coinType);

      if (balance >= item.price) {
        // El usuario puedep permitirselo; hay que hacer la compra siempre y cuando el usuario no haya comprado ese objeto ya.
        if (!item.canBeBoughtMultipleTimes){
          // El objeto solo puede comprarse una vez por usuario; hay que asegurarse de que no se haya comprado ya.
          var found = false;
          for (let i in user.expenses_history) {
            var expense = user.expenses_history[i];
            if (expense.id_item === item.id) {
              found = true;
              break;
            }
          }
          if (found)
            return res.status(401).send({ message: `User with email ${email} already bought item ${item.name}, and this item can only be bought once.`});
        }

        // Comprobación del stock del objeto.

        if (item.stock <= 0)
          return res.status(401).send({ message: `All existences of item ${item.name} have already been sold!`});

        // O bien el usuario no ha comprado el objeto o el objeto se puede comprar varias veces. En cualquier caso, hacer la compra.
        
        Item.findOneAndUpdate({id: itemId}, { $inc: { stock: -1 } },(err, itm) => {
          if (err) return res.status(500).send({ message: `Error ${err}.` });
          if (!itm) return res.status(404).send({ Error: `Error. Item with id ${itemId} not found.` });

          User.findOneAndUpdate({email: email}, 
            { $push:
              { expenses_history:
                {
                  id_item: itemId,
                  coin: item.coinType,
                  points: item.price
                }
              }
            },
            (err, usr) => {
              if (err) return res.status(500).send({ message: `Error ${err}.` });
              if (!usr) return res.status(404).send({ Error: `Error. User with email ${email} not found.` });

              return res.status(200).send({message: "Purchase registered correctly."});
            });
        });

      } else 
        return res.status(401).send({ message: `User with email ${email} does not have enough ${item.coinType} to buy ${item.name}`});
    })
  })
}

function getCurrencyAux(user, currency){
  if (user != undefined) {
    var balance = 0;
    // SUMAR GANANCIAS
    for (let i in user.earnings_history){
      let earnings = user.earnings_history[i];
      if (earnings.coin === currency) {
        balance += earnings.points;
      }
    }
    // RESTAR PERDIDAS
    for (let i in user.expenses_history){
      let expenses = user.expenses_history[i];
      if (expenses.coin === currency) {
        balance -= expenses.points;
      }
    }
    return balance;
  } 

  return 0;
}

function getCurrency(req, res) { // Devuelve la cantidad de monedas del tipo X del usuario Y
  const { userId } = req.params;
  let { currency } = req.params;
  console.log(userId + " " + currency);

  User.findOne({email: userId}, (err, user) => {
    if (err) return res.status(500).send({ message: `Error ${err}.` });
    if (!user) return res.status(404).send({ Error: `Error. User with email ${userId} not found.` });

    var balance = getCurrencyAux(user, currency);

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
  purchaseItem,
};

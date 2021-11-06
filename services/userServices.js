const User = require('../models/users.js');

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
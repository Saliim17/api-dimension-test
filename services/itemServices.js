const Item = require('../models/items.js');

function checkItemStock(itemId) {

    // Busca el objecto para asegurarse de que existe
    Item.findOne({ id: itemId }, (err, itm) => {
      if (err) return err;
      if (!itm) return `Item with id ${itemId} not found. Please, create it first.`;
  
      //El objeto existe, devolvemos su stock.
      return itm.stock;
    });
  }

function getBalance (userId) {
    
}
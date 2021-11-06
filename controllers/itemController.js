const Item = require('../models/items.js');

function getItems(req, res) { // GET all Items
  Item.find({}, (err, items) => {
    if (err) return res.status(500).send({ err });
    return res.status(200).send(items);
  });
}

function getItemsById(req, res) { // GET Items by Id
  const { itemId } = req.params;

  Item.findOne({ id: itemId }, (err, item) => {
    if (err) return res.status(404).send({ message: `Error ${err}. No item found` });
    return res.status(200).send(item);
  });
}

function createItem(req, res) { // POST item
  const newItem = new Item(req.body);
  newItem.save((err, newItemData) => {
    if (err) return res.status(400).send({ message: `Error ${err}. Item creation failed!` });
    return res.status(200).send(newItemData);
  });
}

function deleteItem(req, res) { // DELETE item
  const { itemId } = req.params;
  Item.findOneAndDelete({ id: itemId }, (err, itm) => {
    if (err) return res.status(500).send({ err });
    if (!itm) return res.status(404).send({ message: 'Item not found!' });

    return res.status(200).send({ message: `Item deleted successfully!`, item:itm});
  });
}

function updateItem(req, res) { // PUT item
  const { itemId } = req.params;
  const updateOptions = {
    runValidators: true,
    strict: true,
    new: true
  };

  Item.findOneAndUpdate({ id: itemId }, req.body, updateOptions, (err, itm) => {
    if (err) return res.status(500).send({ err });
    if (!itm) return res.status(404).send({ message: 'No item found with that id.' });

    return res.status(200).send({ message: `Item updated`, item: itm });
  });
}

module.exports = {
  getItems,
  getItemsById,
  createItem,
  deleteItem,
  updateItem,
};
const router = require('express').Router();

const itemController = require('../controllers/itemController');

router.get('/', itemController.getItems);
router.get('/:itemId', itemController.getItemsById);
router.post('/', itemController.createItem);
router.put('/:itemId', itemController.updateItem);
router.delete('/:itemId', itemController.deleteItem);

module.exports = router;
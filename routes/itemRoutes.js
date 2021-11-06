const router = require('express').Router();

const itemController = require('../controllers/itemController');
const itemServices = require('../services/itemServices');

router.get('/', itemController.getItems);
router.get('/:itemId', itemController.getItemsById);
router.post('/', itemController.createItem);
router.put('/:itemId', itemController.updateItem);
router.delete('/:itemId', itemController.deleteItem);
router.get('/stock/:itemId', itemServices.checkItemStock);

module.exports = router;
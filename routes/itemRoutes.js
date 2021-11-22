const router = require('express').Router();
const auth = require('../middleware/auth.js');
const itemController = require('../controllers/itemController');

router.get('/', itemController.getItems);
router.get('/:itemId', itemController.getItemsById);
router.post('/',auth.verifyTokenIsAdmin, itemController.createItem);
router.put('/:itemId', auth.verifyTokenIsAdmin,itemController.updateItem);
router.delete('/:itemId', auth.verifyTokenIsAdmin,itemController.deleteItem);

module.exports = router;
const router = require('express').Router();

const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/email/:userId', userController.getUserByEmail);
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

router.post('/participation/:userId', userController.participateInEvent);
router.post('/buy/:itemId/:email', userController.purchaseItem);
router.get('/currency/:currency/:userId', userController.getCurrency)

module.exports = router;

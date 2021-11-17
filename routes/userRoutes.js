const router = require('express').Router();

const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/email/:userId', userController.getUserByEmail);
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.post('/login', userController.logUser);
router.post('/participation/:userId', userController.participateInEvent);
<<<<<<< HEAD
router.get('/currency/:currency/:userId', userController.getCurrency);

=======
router.post('/buy/:itemId/:email', userController.purchaseItem);
router.get('/currency/:currency/:userId', userController.getCurrency)
>>>>>>> c0816b5601cf471a73989d9accc152d50b8d836c

module.exports = router;

const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth.js');

router.get('/', userController.getUsers);
router.get('/email/:userId', userController.getUserByEmail);
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', auth.verifyTokenAndEmail,userController.deleteUser);
router.post('/login', userController.logUser);
router.post('/participation/:userId', auth.verifyTokenAndEmail, userController.participateInEvent);
router.get('/currency/:currency/:userId', userController.getCurrency);
router.post('/buy/:itemId/:email', auth.verifyTokenAndEmail, userController.purchaseItem);

module.exports = router;

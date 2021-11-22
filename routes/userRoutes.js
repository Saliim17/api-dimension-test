const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth.js');

router.get('/', userController.getUsers);
router.get('/email/:userId', userController.getUserByEmail);
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.post('/login', userController.logUser);
router.post('/participation/:userId', userController.participateInEvent);
router.get('/currency/:currency/:userId', userController.getCurrency);
router.post('/buy/:itemId/:email', userController.purchaseItem);

router.get('/private', auth.verifyToken, (req, res) => {
    res.status(200).send("token correcto maquina");
})
module.exports = router;

const router = require('express').Router();

const userController = require('../controllers/userController');

router.get('/users/', userController.getUsers);
router.get('/users/:userId', userController.getUserByEmail);
router.post('/users/', userController.createUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;

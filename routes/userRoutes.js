const router = require('express').Router();

const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserByEmail);
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;

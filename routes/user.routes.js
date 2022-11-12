const { Router } = require('express');
const { getUsers, deleteUser, updateUser, insertUser, getUserById, updateUserClient } = require('../controllers/user.controller');
const { validateIdUser, validateInsertUser, validateUpdateUser, validateUpdateUserClient } = require('../validators/user.validator');
const checkRols = require('../middlewares/validateRol');
const validateToken = require('../middlewares/verifyToken');

const router = Router();

router.get('/', validateToken, getUsers)
router.get('/:id', validateToken, checkRols([1, 2]), validateIdUser, getUserById);
router.post('/', validateToken, checkRols([1]), validateInsertUser, insertUser);
router.put('/', validateToken, checkRols([1]), validateUpdateUser, updateUser);
router.put('/client', validateToken, checkRols([2]), validateUpdateUserClient, updateUserClient);
router.delete('/:id', validateToken, checkRols([1]), validateIdUser, deleteUser);

module.exports = router;
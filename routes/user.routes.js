const { Router } = require('express');
const { getUsers, deleteUser, updateUser, insertUser, getUserById, updateUserClient } = require('../controllers/user.controller');
const { validateIdUser, validateInsertUser, validateUpdateUser, validateUpdateUserClient } = require('../validators/user.validator');
const checkRols = require('../middlewares/validateRol');
const validateToken = require('../middlewares/verifyToken');

const router = Router();

router.get('/', getUsers)
router.get('/:id', validateIdUser, getUserById);
router.post('/', validateInsertUser, insertUser);
router.put('/', validateUpdateUser, updateUser);
router.put('/client', validateToken, checkRols([2]), validateUpdateUserClient, updateUserClient);
router.delete('/:id', validateIdUser, deleteUser);

module.exports = router;
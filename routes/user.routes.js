const { Router } = require('express');
const { getUsers, deleteUser, updateUser, insertUser, getUserById } = require('../controllers/user.controller');
const { validateIdUser, validateInsertUser, validateUpdateUser } = require('../validators/user.validator');

const router = Router();

router.get('/', getUsers)
router.get('/:id', validateIdUser, getUserById);
router.post('/', validateInsertUser, insertUser);
router.put('/', validateUpdateUser, updateUser);
router.delete('/:id', validateIdUser, deleteUser);

module.exports = router;
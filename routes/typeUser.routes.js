const { Router } = require('express');
const { getTypeUsers, getUsersByType, getTypeUserById } = require('../controllers/typeUser.controller');
const validateToken = require('../middlewares/verifyToken');
const { validateIdType } = require('../validators/typeUser.validator');

const router = Router();

router.get('/', validateToken, getTypeUsers)
router.get('/:id', validateToken, validateIdType, getTypeUserById)
router.get('/:id/users', validateToken, validateIdType, getUsersByType);

module.exports = router;
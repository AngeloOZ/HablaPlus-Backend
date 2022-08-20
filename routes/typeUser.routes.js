const { Router } = require('express');
const { getTypeUsers, getUsersByType, getTypeUserById } = require('../controllers/typeUser.controller');
const { validateIdType } = require('../validators/typeUser.validator');

const router = Router();

router.get('/', getTypeUsers)
router.get('/:id', validateIdType, getTypeUserById)
router.get('/:id/users', validateIdType, getUsersByType);

module.exports = router;
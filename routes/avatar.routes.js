const { Router } = require('express');
const { getAllAvatars, getAvatarByUser, registerAvatar, updateAvatar } = require('../controllers/avatar.controller');
const checkRols = require('../middlewares/validateRol');
const validateToken = require('../middlewares/verifyToken');
const router = Router();


router.get('/', getAllAvatars);
router.get('/user/:id', getAvatarByUser);
router.post('/', validateToken, checkRols([2]), registerAvatar);
router.put('/', validateToken, checkRols([2]), updateAvatar);

module.exports = router;
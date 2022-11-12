const { Router } = require('express');
const { authLogin, authRegister, verifyTokenController } = require('../controllers/auth.controller');
const validateToken = require('../middlewares/verifyToken');
const { validateLogin, validateRegisterUser } = require('../validators/user.validator');

const router = Router();


router.post('/login', validateLogin, authLogin);
router.post('/register', validateRegisterUser, authRegister);
router.post('/verify-token', validateToken, verifyTokenController);

module.exports = router;
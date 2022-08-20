const { Router } = require('express');
const { authLogin, authRegister } = require('../controllers/auth.controller');
const { validateLogin, validateRegisterUser } = require('../validators/user.validator');

const router = Router();


router.post('/login', validateLogin, authLogin);
router.post('/register', validateRegisterUser, authRegister);

module.exports = router;
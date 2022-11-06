const { Router } = require('express');
const { registerWordLearned, getWordsLearnedByUser, getWordsByUser } = require('../controllers/wordLearned.controller');
const { validateInsertWordLearned, valideIdwordLearned } = require('../validators/wordLearned.validator');

const validateToken = require('../middlewares/verifyToken');
const checkRols = require('../middlewares/validateRol');

const router = Router();


router.get('/user', validateToken, checkRols([2]), valideIdwordLearned, getWordsByUser);
router.get('/user/sentences', validateToken, checkRols([2]), valideIdwordLearned, getWordsLearnedByUser);
router.post('/', validateToken, checkRols([2]), validateInsertWordLearned, registerWordLearned);


module.exports = router;
const { Router } = require('express');
const { registerWordLearned, getWordsLearnedByUser, getWordsByUser } = require('../controllers/wordLearned.controller');
const { validateInsertWordLearned, valideIdwordLearned } = require('../validators/wordLearned.validator');

const router = Router();


router.get('/user/:id', valideIdwordLearned, getWordsByUser);
router.get('/user/:id/sentences', valideIdwordLearned, getWordsLearnedByUser);
router.post('/', validateInsertWordLearned, registerWordLearned);


module.exports = router;
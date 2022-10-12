const { Router } = require('express');
const { registerWordLearned, getWordsLearnedByUser } = require('../controllers/wordLearned.controller');
const { validateInsertWordLearned, valideIdwordLearned } = require('../validators/wordLearned.validator');

const router = Router();


router.get('/user/:id', valideIdwordLearned, getWordsLearnedByUser);
router.post('/', validateInsertWordLearned, registerWordLearned);


module.exports = router;
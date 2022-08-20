const { Router } = require('express');
const { registerWordLearned } = require('../controllers/wordLearned.controller');
const { validateInsertWordLearned } = require('../validators/wordLearned.validator');

const router = Router();


router.post('/', validateInsertWordLearned, registerWordLearned);


module.exports = router;
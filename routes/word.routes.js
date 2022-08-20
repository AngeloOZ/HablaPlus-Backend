const { Router } = require('express');
const { getWords, getWordById, insertWord, updateWord, deleteWord } = require('../controllers/word.controller');
const { validateIdWord, validateInsertWord, validateUpdateWord } = require('../validators/word.validator');

const router = Router();

router.get('/', getWords)
router.get('/:id', validateIdWord, getWordById);
router.post('/', validateInsertWord, insertWord);
router.put('/', validateUpdateWord, updateWord);
router.delete('/:id',validateIdWord, deleteWord);

module.exports = router;

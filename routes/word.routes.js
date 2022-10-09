const { Router } = require('express');
const { getWords, getWordById, insertWord, updateWord, deleteWord, getWordByIdUnique } = require('../controllers/word.controller');
const { validateIdWord, validateInsertWord, validateUpdateWord, validateIdUnique } = require('../validators/word.validator');

const router = Router();

router.get('/', getWords)
router.get('/:id', validateIdWord, getWordById);
router.get('/unique/:id', validateIdUnique, getWordByIdUnique);
router.post('/', validateInsertWord, insertWord);
router.put('/', validateUpdateWord, updateWord);
router.delete('/:id', validateIdWord, deleteWord);

module.exports = router;

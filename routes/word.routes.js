const { Router } = require('express');
const { getWords, getWordById, insertWord, updateWord, deleteWord, getWordByIdUnique } = require('../controllers/word.controller');
const checkRols = require('../middlewares/validateRol');
const validateToken = require('../middlewares/verifyToken');
const { validateIdWord, validateInsertWord, validateUpdateWord, validateIdUnique } = require('../validators/word.validator');

const router = Router();

router.get('/', getWords)
router.get('/:id', validateIdWord, getWordById);
router.get('/unique/:id', validateIdUnique, getWordByIdUnique);
router.post('/', validateToken, checkRols([1]), validateInsertWord, insertWord);
router.put('/', validateToken, checkRols([1]), validateUpdateWord, updateWord);
router.delete('/:id', validateToken, checkRols([1]), validateIdWord, deleteWord);

module.exports = router;

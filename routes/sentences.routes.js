const { Router } = require('express');
const { registerSencences, getAllSentences, updateSencences, deleteSentence, getSentenceByIdUnique, getSentenceById } = require('../controllers/seentences.controller');
const checkRols = require('../middlewares/validateRol');
const validateToken = require('../middlewares/verifyToken');
const { validateInsertSentences, validateUpdateSentences, validateIdSentences } = require('../validators/sentences.validator');


const router = Router();

router.get('/', validateToken, getAllSentences);
router.get('/:id', validateToken, getSentenceById);
router.get('/unique/:id', validateToken, getSentenceByIdUnique);
router.post('/', validateToken, checkRols([1]), validateInsertSentences, registerSencences);
router.put('/', validateToken, checkRols([1]), validateUpdateSentences, updateSencences);
router.delete('/:id', validateToken, checkRols([1]), validateIdSentences, deleteSentence);

module.exports = router;
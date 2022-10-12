const { Router } = require('express');
const { registerSencences, getAllSentences, updateSencences, deleteSentence, getSentenceByIdUnique, getSentenceById } = require('../controllers/seentences.controller');
const { validateInsertSentences, validateUpdateSentences, validateIdSentences } = require('../validators/sentences.validator');


const router = Router();

router.get('/', getAllSentences);
router.get('/:id', getSentenceById);
router.get('/unique/:id', getSentenceByIdUnique);
router.post('/', validateInsertSentences, registerSencences);
router.put('/', validateUpdateSentences, updateSencences);
router.delete('/:id', validateIdSentences, deleteSentence);
// router.get('/:id', validateIdType, getTypeUserById)
// router.get('/:id/users', validateIdType, getUsersByType);

module.exports = router;
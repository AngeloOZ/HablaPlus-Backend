const { Router } = require('express');
const { getCategories, getCategoryById, getWordByCategory, insertCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');
const checkRols = require('../middlewares/validateRol');
const validateToken = require('../middlewares/verifyToken');
const { validateInsertCategory, validateIdCategory, validateUpdateCategory } = require("../validators/category.validator");

const router = Router();

router.get('/', validateToken, getCategories)
router.get('/:id', validateToken, validateIdCategory, getCategoryById);
router.get('/:id/words', validateToken, validateIdCategory, getWordByCategory);
router.post('/', validateToken, checkRols([1]), validateInsertCategory, insertCategory);
router.put('/', validateToken, checkRols([1]), validateUpdateCategory, updateCategory);
router.delete('/:id', validateToken, checkRols([1]), validateIdCategory, deleteCategory);

module.exports = router;

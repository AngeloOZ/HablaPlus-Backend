const { Router } = require('express');
const { getCategories, getCategoryById, getWordByCategory, insertCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');
const { validateInsertCategory, validateIdCategory, validateUpdateCategory } = require("../validators/category.validator");

const router = Router();

router.get('/', getCategories)
router.get('/:id', validateIdCategory, getCategoryById);
router.get('/:id/words', validateIdCategory, getWordByCategory);
router.post('/', validateInsertCategory, insertCategory);
router.put('/', validateUpdateCategory, updateCategory);
router.delete('/:id', validateIdCategory, deleteCategory);

module.exports = router;

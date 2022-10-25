const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateInsertWord = [
   check('id_category')
      .exists()
      .withMessage('id_category is required')
      .bail()
      .notEmpty()
      .bail()
      .withMessage('id_category must not be empty')
      .isInt()
      .toInt(),
   check('description')
      .exists()
      .withMessage("description is required")
      .bail()
      .notEmpty()
      .withMessage("description must not be empty")
      .toLowerCase().trim(),
   check('icon')
      .exists()
      .withMessage("icon is required")
      .bail()
      .notEmpty()
      .withMessage("icon must not be empty")
      .bail()
      .trim(),
   check('audio')
      .exists()
      .withMessage("audio is required")
      .bail()
      .notEmpty()
      .withMessage("audio must not be empty")
      .bail()
      .trim(),
   (req, res, next) => validateResult(req, res, next)
];

const validateUpdateWord = [
   check('id_word')
      .exists()
      .withMessage('id_category is required')
      .bail()
      .notEmpty()
      .bail()
      .isInt()
      .toInt(),
   check('description')
      .exists()
      .withMessage("description is required")
      .bail()
      .notEmpty()
      .toLowerCase().trim(),
   check('icon')
      .exists()
      .withMessage("icon is required")
      .bail()
      .notEmpty()
      .withMessage("icon must not be empty")
      .trim(),
   check('audio')
      .exists()
      .withMessage("audio is required")
      .bail()
      .notEmpty()
      .withMessage("audio must not be empty")
      .trim(),
   check('id_category')
      .exists()
      .withMessage('id_category is required')
      .bail()
      .notEmpty()
      .bail()
      .isInt()
      .toInt(),
   (req, res, next) => validateResult(req, res, next)
];

const validateIdWord = [
   check('id')
      .exists()
      .withMessage('id category is required')
      .bail()
      .isInt()
      .withMessage("id must be integer")
      .toInt(),
   (req, res, next) => validateResult(req, res, next)
];

const validateIdUnique = [
   check('id')
      .exists()
      .withMessage('id word is required')
      .bail()
      .notEmpty()
      .withMessage('id must be not empty'),
   (req, res, next) => validateResult(req, res, next)
];

module.exports = { validateInsertWord, validateUpdateWord, validateIdWord, validateIdUnique }
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
      .not().isURL()
      .withMessage("icon must not be an url")
      .trim(),
   check('audio')
      .exists()
      .withMessage("audio is required")
      .bail()
      .notEmpty()
      .withMessage("audio must not be empty")
      .bail()
      .not().isURL()
      .withMessage("audio must not be an url")
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
      .not().isURL()
      .withMessage("icon must not be an url")
      .trim(),
   check('audio')
      .exists()
      .withMessage("audio is required")
      .bail()
      .notEmpty()
      .withMessage("audio must not be empty")
      .not().isURL()
      .withMessage("audio must not be an url")
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

module.exports = { validateInsertWord, validateUpdateWord, validateIdWord }
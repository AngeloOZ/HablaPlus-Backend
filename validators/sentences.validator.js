const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");


const validateIdSentences = [
   check('id')
      .exists()
      .withMessage('id type is required')
      .bail()
      .isInt()
      .withMessage("id must be integer")
      .bail()
      .toInt(),
   (req, res, next) => validateResult(req, res, next)
];

const validateInsertSentences = [
   check('sentence')
      .exists()
      .withMessage('sentence is required')
      .bail()
      .notEmpty()
      .withMessage('sentence must be not empty')
      .bail()
      .trim(),
   check('pictograma_one')
      .exists()
      .withMessage('pictograma_one type is required')
      .bail()
      .isInt()
      .withMessage("pictograma_one must be integer")
      .bail()
      .toInt(),
   check('pictograma_two')
      .exists()
      .withMessage('pictograma_two type is required')
      .bail()
      .isInt()
      .withMessage("pictograma_two must be integer")
      .bail()
      .toInt(),
   (req, res, next) => validateResult(req, res, next)
];

const validateUpdateSentences = [
   check('id_sentence')
      .exists()
      .withMessage('id type is required')
      .bail()
      .isInt()
      .withMessage("id must be integer")
      .bail()
      .toInt(),
   check('sentence')
      .exists()
      .withMessage('sentence is required')
      .bail()
      .notEmpty()
      .withMessage('sentence must be not empty')
      .bail()
      .trim(),
   check('pictograma_one')
      .exists()
      .withMessage('pictograma_one type is required')
      .bail()
      .isInt()
      .withMessage("pictograma_one must be integer")
      .bail()
      .toInt(),
   check('pictograma_two')
      .exists()
      .withMessage('pictograma_two type is required')
      .bail()
      .isInt()
      .withMessage("pictograma_two must be integer")
      .bail()
      .toInt(),
   (req, res, next) => validateResult(req, res, next)
];

module.exports = { validateInsertSentences, validateUpdateSentences, validateIdSentences }
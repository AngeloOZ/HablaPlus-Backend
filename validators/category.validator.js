const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateInsertCategory = [
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
   check('icon2')
      .exists()
      .withMessage("icon is required")
      .bail()
      .notEmpty()
      .withMessage("icon must not be empty")
      .trim(),
   (req, res, next) => validateResult(req, res, next)
];

const validateUpdateCategory = [
   check('id_category')
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
   check('icon2')
      .exists()
      .withMessage("icon is required")
      .bail()
      .notEmpty()
      .withMessage("icon must not be empty")
      .trim(),
   (req, res, next) => validateResult(req, res, next)
];

const validateIdCategory = [
   check('id')
      .exists()
      .withMessage('id category is required')
      .bail()
      .isInt()
      .withMessage("id must be integer")
      .toInt(),
   (req, res, next) => validateResult(req, res, next)
];

module.exports = { validateInsertCategory, validateUpdateCategory, validateIdCategory }
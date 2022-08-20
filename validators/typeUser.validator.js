const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateIdType = [
   check('id')
      .exists()
      .withMessage('id type is required')
      .bail()
      .isInt()
      .withMessage("id must be integer")
      .toInt(),
   (req, res, next) => validateResult(req, res, next)
];

module.exports = { validateIdType }
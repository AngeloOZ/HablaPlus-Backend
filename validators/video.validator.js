const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateInsertVideo = [
   check('description')
      .exists()
      .withMessage("description is required")
      .bail()
      .notEmpty()
      .toLowerCase().trim(),
   check('link')
      .exists()
      .withMessage("link is required")
      .bail()
      .notEmpty()
      .withMessage("link must not be empty")
      .toLowerCase().trim(),
   (req, res, next) => validateResult(req, res, next)
];

const validateIdVideo = [
   check('id')
      .exists()
      .withMessage('id video is required')
      .bail()
      .isInt()
      .withMessage("id must be integer"),
   (req, res, next) => validateResult(req, res, next)
];

module.exports = { validateInsertVideo, validateIdVideo }
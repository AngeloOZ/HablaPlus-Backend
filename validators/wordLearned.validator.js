const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateInsertWordLearned = [
   check('id_user')
      .exists()
      .withMessage('id_user type is required')
      .bail()
      .isInt()
      .withMessage("id_user must be integer")
      .toInt(),
   check('id_word')
      .exists()
      .withMessage('id_word type is required')
      .bail()
      .isInt()
      .withMessage("id_word must be integer")
      .toInt(),
   (req, res, next) => validateResult(req, res, next)
];

const valideIdwordLearned = [
   check('id')
   .exists()
   .notEmpty()
   .not().isInt()
   .toInt()
];

module.exports = { validateInsertWordLearned, valideIdwordLearned }
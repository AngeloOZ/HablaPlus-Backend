import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper";

const validateInsert = [
   check('').notEmpty().toLowerCase(),
   (req, res, next) => validateResult(req, res, next)
];

module.exports = { validateInsert }
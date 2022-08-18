const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
   try {
      validationResult(req).throw();
      return next();
   } catch (err) {
      res.status(403);
      res.json({
         status: 403,
         message: "invalid arguments",
         errors: err.array()
      })
   }
}

module.exports = {validateResult};
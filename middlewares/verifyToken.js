const { request, response } = require('express');
const { verifyToken } = require('../helpers/jwt');
const { printToJson } = require('../helpers/printJson');

const validateToken = async (req = request, res = response, next) => {
   try {
      const authorization = req.headers.authorization;
      if (authorization && authorization.startsWith('Bearer ')) {
         const token = authorization.substring(7).trim();
         const payloadToken = verifyToken(token);
         req.currentToken = payloadToken;
         return next();
      }
      return res.status(401).json(printToJson(401, "Not authorized"))
   } catch (error) {
      return res.status(401).json(printToJson(401, "Invalid token", error))
   }
}

module.exports = validateToken;
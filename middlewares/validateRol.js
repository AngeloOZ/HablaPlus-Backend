const { request, response } = require('express');
const { printToJson } = require('../helpers/printJson');

/**
 * Está funcion permite verificar los roles admitidos
 * @param {Array<Number>} roles Listado de roles admitidos
 * @returns {void}
 */
const checkRols = (roles) => async (req = request, res = response, next) => {
   try {
      const { id_type } = req.currentToken;
      if (id_type) {
         const listRols = [...roles];
         if (listRols.includes(id_type)) {
            return next();
         }
         return res.status(403).json(printToJson(403, `User type ${id_type} No authorized`));
      }
      return res.status(403).json(printToJson(403, `User type ${id_type} No authorized`));
   } catch (error) {
      return res.status(500).json(printToJson(500, error.message, error));
   }
}

module.exports = checkRols;

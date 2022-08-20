const { request, response } = require('express');
const { printToJson } = require('../helpers/printJson');

/**
 * Está funcion permite verificar los roles admitidos
 * @param {Array<Number>} roles Listado de roles admitidos
 * @returns {void}
 */
const checkRols = (roles) => async (req = request, res = response, next) => {
   try {
      console.log('ME EJECUTEEEEEEEEEEEEE');
      const { id_type } = req.currentToken;
      console.log(id_type);
      if (id_type) {
         const listRols = [...roles];
         if (listRols.includes(id_type)) {
            return next();
         }
         return res.status(403).json(printToJson(403, 'No authorized'));
      }
      return res.status(403).json(printToJson(403, 'No authorized'));
   } catch (error) {
      return res.status(500).json(printToJson(500, error.message, error));
   }
}

module.exports = checkRols;

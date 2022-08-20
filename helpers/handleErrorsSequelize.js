const { response } = require("express");
const { printToJson } = require("./printJson");

/**
* @typedef {Object} IErrorSequelize
* @property {String} message mensaje de error
* @property {String} type Tipo de error
* @property {String} value valor repetido
* @property {String} path valor repetido
* @property {Number} code El id de la categoria
*/

/**
 * @param {IErrorSequelize} error Listado de error
 * @param {response} response Es el objeto de express
 */
const errorsSequelize = (response, error) => {
   switch (error?.code) {
      case 1062:
         return response.status(400).json({
            status: 400,
            message: error.message,
            description: `${error?.path} must be unique, ${error?.value} already exists`,
            errorCode: error?.code
         })
      case 1048:
         return response.status(400).json({
            status: 400,
            message: error.message,
            description: `${error?.path} is null`,
            errorCode: error?.code
         });
      default:
         return response.status(500).json(printToJson(500, error?.message));
   }
}

module.exports = errorsSequelize;
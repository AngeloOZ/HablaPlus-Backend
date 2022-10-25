/**
 * Funcion que permite devolver un json para API
 * @param {Number} status Es el codigo de estado del protocolo http
 * @param {String} message Es el mensaje que se le indicara al usuario
 * @param {Object|Array|String} [data] Es la informacion adicional a mostrar
 * @returns {Object}
 */
const printToJson = (status = 404, message = "No found", data = null) => {
   const res = {
      status,
      message,
   }
   if (data) res.data = data;
   return res;
}

const pathCategoryToUrlFile = (category) => {
   return `${process.env.URL_BASE}${category.icon}`;
}

module.exports = { printToJson, pathCategoryToUrlFile };
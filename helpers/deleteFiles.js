const fs = require("fs");
const path = require('path')
/**
 * Funcion para borrar archivos
 * @param {string} url url del archivo a borrar 
 */
const deleteFiles = (url) => {
   try {
      const filePath = url.replace(process.env.URL_BASE, '');
      const rootPath = path.join('public', filePath);
      if (fs.existsSync(rootPath)) {
         fs.unlinkSync(rootPath);
      }
   } catch (error) {
      console.log(error);
      // throw error;
   }
}

module.exports = { deleteFiles }
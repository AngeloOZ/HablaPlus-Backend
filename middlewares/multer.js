const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { printToJson } = require('../helpers/printJson');

/**
 * 
 * @param {String} tipo Es el tipo de archivo a manejar
 * @returns 
 */
const uploadFiles = (tipo) => {
   try {
      const storage = multer.diskStorage({
         destination: `./public/${tipo}`,
         filename: function (_req, file, cb) {
            const extension = path.extname(file.originalname);
            cb(null, `${uuidv4()}${extension}`)
         }
      })
      const upload = multer({
         storage,
         limits: { fileSize: 10200000 }
      }).single('gatito');

      return upload;
   } catch (error) {
      console.log(error.message)
   }
}

module.exports = uploadFiles;

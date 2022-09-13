const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

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
      }).single('file');

      return upload;
   } catch (error) {
      console.log(error.message)
   }
}

const uploadFilesAudio = () => {
   try {
      const storage = multer.diskStorage({
         destination: `./public/audio`,
         filename: function (_req, file, cb) {
            const extension = path.extname(file.originalname);
            if(extension){
               cb(null, `${uuidv4()}${extension}`)
            }else{
               cb(null, `${uuidv4()}.webm`)
            }
         }
      });

      const upload = multer({
         storage,
         limits: { fileSize: 10200000 }
      }).single('file');

      return upload;

   } catch (error) {
      console.log(error.message)
   }
}

module.exports = { uploadFiles, uploadFilesAudio };

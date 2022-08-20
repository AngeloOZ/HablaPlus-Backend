const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Funcion para encriptar las contrasenias
 * @param {String} plainText La contrasenia en texto plano 
 * @returns {String}
 */
const passwordHash = async (plainText) => {
   try {
      return await bcrypt.hash(plainText, saltRounds)
   } catch (error) {
      console.error(error);
      return undefined;
   }
}

/**
 * 
 * @param {String} plainText La contrasenia provista en texto plano
 * @param {String} hash La contrasenia guardada y encriptada de la base
 * @returns {Boolean}
 */
const passwordVerify = async (plainText, hash) => {
   try {
      return await bcrypt.compare(plainText, hash);
   } catch (error) {
      console.error(error);
      return false;
   }
}

module.exports = { passwordHash, passwordVerify }
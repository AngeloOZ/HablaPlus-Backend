const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_JWT;

/**
* @typedef {Object} IUser
* @property {Number} [id_user] El Id del usuario
* @property {String} names Los nombres del usuario
* @property {String} surname Los apellidos de los usuarios
* @property {String} username El nombre de pila de usuario, 
* @property {Number} id_type El id del tipo o rol del usuario
*/

/**
 * 
 * @param {IUser} payload informacion del usuario 
 * @param {Number|String|undefined} expireTime Tiempo que durará el token
 * @returns {String} 
 */
const singToken = async (payload, expireTime = undefined) => {
   try {
      if (!SECRET_KEY) {
         throw "No hay semilla para firmar el token";
      }
      if(expireTime){
         return await jwt.sign(payload, SECRET_KEY, { expiresIn: expireTime });
      }
      return await jwt.sign(payload, SECRET_KEY);
   } catch (error) {
      console.error(error);
      throw error;
   }
}

/**
 * 
 * @param {String} token Es el token a verificar
 * @returns {IUser}
 */
const verifyToken = async (token) => {
   try {
      if (!SECRET_KEY) {
         throw "No hay semilla para firmar el token";
      }
      return await jwt.verify(token, SECRET_KEY);
   } catch (error) {
      console.error(error);
      throw error;
   }
}

module.exports = { singToken, verifyToken }
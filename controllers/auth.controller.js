const { request, response } = require('express');
const { passwordVerify, passwordHash } = require('../helpers/Bcrypt');
const { singToken, verifyToken } = require('../helpers/jwt');
const { printToJson } = require('../helpers/printJson');
const UserModel = require('../models/User');
const { User_avatar } = require('../models/User_avatar');
const { getCurrentAvatar } = require('./avatar.controller');

/**
* @typedef {Object} IUser
* @property {Number} [id_user] El Id del usuario
* @property {String} names Los nombres del usuario
* @property {String} surname Los apellidos de los usuarios
* @property {Number} age La edad del usuario
* @property {String} username El nombre de pila de usuario, 
* @property {String} password La contrasenia del usuario
* @property {Number} id_type El id del tipo o rol del usuario
*/

const authLogin = async (req = request, res = response) => {
   try {
      const { username, password } = req.body;
      const user = await UserModel.ShowByUsername(username);

      if (user) {
         if (user.username == username && await passwordVerify(password, user.password)) {
            const payload = {
               names: user.names,
               surname: user.surname,
               username: user.username,
               age: user.age,
               id_user: user.id_user,
               id_type: user.id_type,
            }
            if(user.id_type == 2){
               const currentAvatar = await getCurrentAvatar(user.id_user);
               payload.avatar = currentAvatar;
            }
            const token = await singToken(payload, "1d");
            payload.token = token;

            return res.status(200).json(payload);
         }
         return res.status(404).json(printToJson(404, "The user or password are wrong"));
      }
      return res.status(404).json(printToJson(404, "The user or password are wrong 1"));
   } catch (error) {
      console.log(error)
      return res.status(404).json(printToJson(404, "The user or password are wrong 2", error));
   }
}

const authRegister = async (req = request, res = response) => {
   try {
      const { names, surname, age, username, password: plainPassword } = req.body;
      const password = await passwordHash(plainPassword);

      const user = await UserModel.Insert({
         names,
         surname,
         age,
         username,
         password,
         id_type: 2
      });

      await insertAvatarCreatePatient(user.id_user);

      const payload = {
         names: user.names,
         surname: user.surname,
         username: user.username,
         age: user.age,
         id_user: user.id_user,
         id_type: user.id_type
      }
      const token = await singToken(payload, "1d");
      payload.token = token;
      return res.status(200).json(payload);
   } catch (error) {
      return res.status(500).json(printToJson(500, "failed insertion", error));
   }
}

const verifyTokenController = async (req = request, res = response) => {
   try {
      const { token } = req.body;
      const payload = verifyToken(token);
      res.status(200).json(payload);
   } catch (error) {
      res.status(403).json(printToJson(403, "Invalid token", error))
   }
}

async function insertAvatarCreatePatient(id_user) {
   const initAvatars = [
      {
         id_avatar: 1,
         id_user: id_user,
         selected: true
      },
      {
         id_avatar: 2,
         id_user: id_user,
         selected: false
      }
   ]
   for (const avatar of initAvatars) {
      await User_avatar.create(avatar)
   }
}

module.exports = { authLogin, authRegister, verifyTokenController, insertAvatarCreatePatient }
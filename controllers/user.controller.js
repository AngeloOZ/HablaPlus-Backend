const { request, response } = require('express');
const { passwordHash } = require('../helpers/Bcrypt');
const errorsSequelize = require('../helpers/handleErrorsSequelize');
const { printToJson } = require('../helpers/printJson');
const UserModel = require('../models/User');


const getUsers = async (req = request, res = response) => {
   try {
      const users = await UserModel.Show();
      if (users.length != 0)
         return res.status(200).json(printToJson(200, "success", users));
      else
         return res.status(200).json(printToJson(200, "users no found", []));
   } catch (error) {
      return errorsSequelize(res, error);
   }
}

const getUserById = async (req = request, res = response) => {
   try {
      const { id } = req.params;
      const user = await UserModel.ShowById(id);
      if (user) {
         return res.status(200).json(printToJson(200, "success", user));
      } else {
         return res.status(404).json(printToJson(404, "user no found"));
      }
   } catch (error) {
      return errorsSequelize(res, error);
   }
}

const insertUser = async (req = request, res = response) => {
   try {
      const { names, surname, age, username, password: plainPassword, id_type } = req.body;
      const password = await passwordHash(plainPassword);

      const user = await UserModel.Insert({
         names,
         surname,
         age,
         username,
         password,
         id_type
      });

      return res.status(201).json(printToJson(201, "success", user));
   } catch (error) {
      return res.status(500).json(printToJson(500, "failed insertion", error));
   }
}

const updateUser = async (req = request, res = response) => {
   try {
      const { id_user, names, surname, age, username, newPassword, id_type } = req.body;
      const newUser = {
         id_user,
         names,
         surname,
         age,
         username,
         password: undefined,
         id_type
      }
      if (newPassword) {
         const password = await passwordHash(newPassword);
         newUser.password = password;
      }

      const user = await UserModel.Update(newUser);
      return res.status(200).json(printToJson(200, "success", user));
   } catch (error) {
      return res.status(500).json(printToJson(500, "failed insertion", error));
   }
}

const deleteUser = async (req = request, res = response) => {
   try {
      const { id } = req.params;
      const user = await UserModel.ShowById(id);
      if (user) {
         await UserModel.Delete(id);
         return res.status(204).json(printToJson(204, "success"));
      }
      return res.status(404).json(printToJson(404, "User no found with id " + id));
   } catch (error) {
      console.log(error);
      return errorsSequelize(res, error);
   }
}

module.exports = { getUsers, getUserById, insertUser, updateUser, deleteUser }
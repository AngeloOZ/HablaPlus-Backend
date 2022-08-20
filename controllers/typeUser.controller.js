const { request, response } = require('express');
const { printToJson } = require('../helpers/printJson');
const { Type_user } = require('../models/Type_user');
const UserModel = require('../models/User');

const getTypeUsers = async (req = request, res = response) => {
   try {
      const rols = await Type_user.findAll();
      res.status(200).json(printToJson(200, "success", rols))
   } catch (error) {
      return res.status(500).json(printToJson(500, error.message, error));
   }
}

const getTypeUserById = async (req = request, res = response) => {
   try {
      const { id } = req.params;
      const rols = await Type_user.findOne({ where: { id_type: id } });
      res.status(200).json(printToJson(200, "success", rols))
   } catch (error) {
      return res.status(500).json(printToJson(500, error.message, error));
   }
}

const getUsersByType = async (req = request, res = response) => {
   try {
      const { id } = req.params;
      const users = await UserModel.User.findAll({ where: { id_type: id }, attributes: ['id_user', 'names', 'surname', 'age', 'username', 'id_type'] });
      res.status(200).json(printToJson(200, "success", users))
   } catch (error) {
      return res.status(500).json(printToJson(500, error.message, error));
   }
}

module.exports = { getTypeUsers, getTypeUserById, getUsersByType }
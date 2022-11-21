const { request, response } = require('express');
const { Op } = require("sequelize");
const { singToken } = require('../helpers/jwt');
const { printToJson } = require('../helpers/printJson');
const { Avatar } = require('../models/Avatar');
const { User_avatar } = require('../models/User_avatar');

const getCurrentAvatar = async (id) => {
   const request = await User_avatar.findOne({
      where: {
         [Op.and]: [
            { id_user: id },
            { selected: true }
         ]
      },
      include: Avatar,
   });
   return request?.AVATAR?.url;
}

async function renovarToken(user) {
   try {
      delete user.iat;
      delete user.exp;
      const urlAvatar = await getCurrentAvatar(user.id_user);
      user.avatar = urlAvatar;
      const token = await singToken(user, "1d");
      user.token = token;
      return user;
   } catch (error) {
      console.error(error);
   }
}

const getAllAvatars = async (req = request, res = response) => {
   const avatars = await Avatar.findAll();
   return res.status(200).json(printToJson(200, 'succes', avatars));
}

const getAvatarByUser = async (req = request, res = response) => {
   try {
      const id = req.currentToken.id_user;

      let avatarsRequest = await User_avatar.findAll({ where: { id_user: id } });
      const avatarsUser = avatarsRequest.map(ava => ava.dataValues);
      avatarsRequest = await Avatar.findAll();
      const avatarsAll = avatarsRequest.map(ava => ava.dataValues);

      for (const avatar of avatarsAll) {
         const aux = avatarsUser.find(curr => curr?.id_avatar === avatar.id_avatar);
         if (!aux) continue;
         avatar.id_user_avatar = aux.id_user_avatar;
         avatar.reclaimed = true;
         avatar.selected = aux.selected;
      }

      return res.status(200).json(printToJson(200, 'succes', avatarsAll));
   } catch (error) {
      return res.status(500).json(printToJson(500, 'error', error));
   }
}

const registerAvatar = async (req = request, res = response) => {
   const currentUser = req.currentToken;
   const { id_avatar } = req.body;
   try {
      const avatarCurrent = await User_avatar.findOne({
         where: {
            [Op.and]: [
               { id_user: currentUser.id_user },
               { selected: 1 }
            ]
         }
      });

      if (avatarCurrent) {
         avatarCurrent.selected = false;
         await avatarCurrent.save();
      }

      await User_avatar.create({
         selected: true,
         id_user: currentUser.id_user,
         id_avatar: id_avatar,
      });

      const newPayload = await renovarToken(currentUser);
      return res.status(200).json(newPayload);

   } catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }

}

const updateAvatar = async (req = request, res = response) => {
   const currentUser = req.currentToken;
   const { id_user_avatar } = req.body;
   try {
      const avatarCurrent = await User_avatar.findOne({
         where: {
            [Op.and]: [
               { id_user: currentUser.id_user },
               { selected: 1 }
            ]
         }
      });

      if (avatarCurrent) {
         avatarCurrent.selected = false;
         await avatarCurrent.save();
      }

      const userAvatar = await User_avatar.findByPk(id_user_avatar);
      userAvatar.selected = true;
      await userAvatar.save();

      const newPayload = await renovarToken(currentUser);
      return res.status(200).json(newPayload);

   } catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }
}

module.exports = { getAllAvatars, getAvatarByUser, registerAvatar, getCurrentAvatar, updateAvatar }

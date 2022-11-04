const { DataTypes } = require('sequelize');
const { sequelize } = require('./database');

const User_avatar = sequelize.define('USER_AVATAR', {
   id_user_avatar: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   selected: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
   }
}, {
   timestamps: false,
   indexes: [{
      unique: true,
      fields: ['id_avatar', 'id_user']
   }]
})

module.exports = { User_avatar }
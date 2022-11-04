const { DataTypes } = require('sequelize');
const { sequelize } = require('./database');
const { User_avatar } = require('./User_avatar');

const Avatar = sequelize.define('AVATAR', {
   id_avatar: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   url: {
      type: DataTypes.STRING,
      allowNull: false,
   }
}, {
   timestamps: false,
});

Avatar.hasMany(User_avatar, {
   foreignKey: {
      name: 'id_avatar',
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   sourceKey: 'id_avatar'
})

User_avatar.belongsTo(Avatar, {
   foreignKey: 'id_avatar',
   sourceKey: 'id_avatar'
})


async function verficiarDatos() {
   const avatares = await Avatar.findAll();
   if (avatares.length == 0) {
      const url = [
         'https://res.cloudinary.com/dzfg3crbt/image/upload/v1667487320/Avatares/avatar1_rnbb6a.png',
         'https://res.cloudinary.com/dzfg3crbt/image/upload/v1667487320/Avatares/avatar2_blipsa.png',
         'https://res.cloudinary.com/dzfg3crbt/image/upload/v1667487320/Avatares/avatar3_tely6z.png',
         'https://res.cloudinary.com/dzfg3crbt/image/upload/v1667487320/Avatares/avatar4_bonbrc.png',
         'https://res.cloudinary.com/dzfg3crbt/image/upload/v1667487320/Avatares/avatar5_yfp1xy.png',
         'https://res.cloudinary.com/dzfg3crbt/image/upload/v1667487321/Avatares/avatar6_bor5ww.png',
      ]
      url.forEach(async avatar => {
         try {
            await Avatar.create({ url: avatar })
         } catch (error) {

         }
      });
   }
}

verficiarDatos();

module.exports = { Avatar }
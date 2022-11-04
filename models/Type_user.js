const { DataTypes } = require('sequelize');
const { sequelize } = require('./database');
const { User } = require('./User');

const Type_user = sequelize.define('TYPE_USER', {
   id_type: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   description: {
      type: DataTypes.STRING(50),
      allowNull: false
   }
}, {
   timestamps: false,
});

Type_user.hasMany(User, {
   foreignKey: {
      name: 'id_type',
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   sourceKey: 'id_type'
})
User.belongsTo(Type_user, {
   foreignKey: 'id_type',
   sourceKey: 'id_type'
})

async function verficiarDatos() {
   const typeUser = await Type_user.findAll();
   if (typeUser.length == 0) {
      await Type_user.create({ description: 'admin' })
      await Type_user.create({ description: 'paciente' })
   };
}

verficiarDatos();

module.exports = { Type_user }
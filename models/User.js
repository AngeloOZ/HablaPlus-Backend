const { DataTypes } = require('sequelize');
const { sequelize } = require('./database');
const { Score } = require('./Score');
const { Word_learned } = require('./Word_learned');

const User = sequelize.define('USER', {
   id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   names: {
      type: DataTypes.STRING(50),
      allowNull: false
   },
   surname: {
      type: DataTypes.STRING(50),
      allowNull: false
   },
   age: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
   },
   password: {
      type: DataTypes.STRING(100),
      allowNull: false
   },
}, {
   timestamps: false,
})
User.hasMany(Score, {
   foreignKey: {
      name: 'id_user',
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   sourceKey: 'id_user'
});
Score.belongsTo(User, {
   foreignKey: 'id_user',
   sourceKey: 'id_user'
});

User.hasMany(Word_learned, {
   foreignKey: {
      name: 'id_user',
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   sourceKey: 'id_user'
})
Word_learned.belongsTo(User, {
   foreignKey: 'id_user',
   sourceKey: 'id_user'
})

module.exports = {User}
const { DataTypes } = require('sequelize');
const { sequelize } = require('./database');
const { Word } = require('./Word');

const Category = sequelize.define('CATEGORY', {
   id_category: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   description: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
   },
   icon: {
      type: DataTypes.STRING,
      allowNull: false
   }
}, {
   timestamps: false,
})

Category.hasMany(Word, {
   // onDelete: 'RESTRICT',
   // onUpdate: 'RESTRICT',
   foreignKey: {
      name: 'id_category',
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   sourceKey: 'id_category'
})
Word.belongsTo(Category, {
   foreignKey: 'id_category',
   sourceKey: 'id_category'
})

const Show = () => { }

const ShowById = () => { }

const ShowByField = () => { }

const Insert = () => { }

const Update = () => { }

const Delete = () => { }


module.exports = { Category, Show, ShowById, ShowByField, Insert, Update, Delete };
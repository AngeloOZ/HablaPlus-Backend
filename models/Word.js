const { DataTypes } = require('sequelize');
const { sequelize } = require('./database');
const { Word_learned } = require('./Word_learned');

const Word = sequelize.define('WORD', {
   id_word: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   description: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true,
   },
   icon: {
      type: DataTypes.STRING,
      allowNull: false
   }
}, {
   timestamps: false,
});

Word.hasMany(Word_learned, {
   foreignKey: {
      name: 'id_word',
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   sourceKey: 'id_word'
})
Word_learned.belongsTo(Word, {
   foreignKey: 'id_word',
   sourceKey: 'id_word'
})

module.exports = {Word}
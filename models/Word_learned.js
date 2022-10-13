const { DataTypes } = require('sequelize');
const { sequelize } = require('./database');

const Word_learned = sequelize.define('WORD_LEARNED', {
   id_word_learned: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
}, {
   timestamps: false,
   indexes: [{
      unique: true,
      fields: ['id_word', 'id_user']
   }]
})

module.exports = { Word_learned }
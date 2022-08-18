const { DataTypes } = require('sequelize');
const { sequelize } = require('./database');

const Score = sequelize.define('SCORE', {
   id_score: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   number_starts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
   }
}, { 
   timestamps: false,
})

module.exports = {Score}
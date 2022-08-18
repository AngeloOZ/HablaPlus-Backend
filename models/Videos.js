const { DataTypes } = require('sequelize');
const { sequelize } = require('./database');

const Videos = sequelize.define('VIDEOS', {
   id_video: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   description: {
      type: DataTypes.STRING(100),
      allowNull: false
   },
   link: {
      type: DataTypes.TEXT,
      allowNull: false
   }
}, {
   timestamps: false,
});

const Show = async () => {
   const query = await Videos.findAll();
   if(query.length != 0){
      return query[0].dataValues;
   }
   return undefined;
}

const ShowById = async (id) => {
   const query = await Videos.findByPk(id);
   if(query.length != 0){
      return query.dataValues;
   }
   return undefined;
}

const ShowByField = () => {

}

const Insert = () => {

}

const Update = () => {

}

const Delete = () => {

}

module.exports = { Videos, Show, ShowById, ShowByField, Insert, Update, Delete };
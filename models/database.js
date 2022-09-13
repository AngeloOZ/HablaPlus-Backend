const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
   process.env.DB_DATABASE,
   process.env.DB_USER,
   process.env.DB_PASSWORD,
   {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      pool:{
         max: 20,
         min: 0,
         acquire: 60000,
         idle: 10000
      }
   }
);

module.exports = { sequelize }



const { Sequelize } = require("sequelize");


let sequelize;


switch (process.env.DATABASE_HOST) {
   case 'always':
      sequelize = new Sequelize(
         process.env.DB_ALWAYS_DATABASE,
         process.env.DB_ALWAYS_USER,
         process.env.DB_ALWAYS_PASSWORD,
         {
            host: process.env.DB_ALWAYS_HOST,
            port: process.env.DB_ALWAYS_PORT,
            dialect: 'mysql',
            pool: {
               max: 20,
               min: 1,
               acquire: 60000,
               idle: 10000
            }
         }
      );
      break;
   case 'railway':
      sequelize = new Sequelize(
         process.env.DB_RAILWAY_DATABASE,
         process.env.DB_RAILWAY_USER,
         process.env.DB_RAILWAY_PASSWORD,
         {
            host: process.env.DB_RAILWAY_HOST,
            port: process.env.DB_RAILWAY_PORT,
            dialect: 'mysql',
            pool: {
               max: 20,
               min: 1,
               acquire: 60000,
               idle: 10000
            }
         }
      );
      break;
   default:
      sequelize = new Sequelize(
         process.env.DB_DATABASE,
         process.env.DB_USER,
         process.env.DB_PASSWORD,
         {
            host: process.env.DB_HOST,
            port: process.env.DB_LOCAL_PORT,
               dialect: 'mysql',
            pool: {
               max: 20,
               min: 0,
               acquire: 90000,
               idle: 10000
            }
         }
      );
      break;
}



module.exports = { sequelize }



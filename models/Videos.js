const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('./database');

const Videos = sequelize.define('VIDEOS', {
   id_video: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   id_unique: {
      type: DataTypes.STRING,
      defaultValue: Sequelize.UUIDV4
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

/**
* @typedef {Object} IVideo
* @property {Number} [id_video] El Id del video
* @property {String} id_unique El Id del video unico uuid
* @property {String} description La descripcion del video
* @property {String} link El iframe del video de YouTube
*/


/**
 * Funcion para recuperar todos los videos de la base
 * @returns {Array<IVideo>}
 */
const Show = async () => {
   const transaction = await sequelize.transaction();
   try {
      const query = await Videos.findAll();
      await transaction.commit();
      return query;
   } catch (error) {
      await transaction.rollback();
      const customError = {
         message: error?.errors[0]?.message,
         type: error?.errors[0]?.type,
         path: error?.errors[0]?.path,
         value: error?.errors[0]?.value,
         code: error?.parent?.errno || 1048,
      }
      throw customError;
   }
}

/**
 * Funcion para recuperar un video de la base por el id
 * @param {Number} id El id del video a buscar
 * @returns {IVideo | undefined} 
 */
const ShowById = async (id) => {
   const transaction = await sequelize.transaction();
   try {
      const query = await Videos.findByPk(id);
      await transaction.commit();
      if (query) {
         return query.dataValues;
      }
      return undefined;
   } catch (error) {
      await transaction.rollback();
      const customError = {
         message: error?.errors[0]?.message,
         type: error?.errors[0]?.type,
         path: error?.errors[0]?.path,
         value: error?.errors[0]?.value,
         code: error?.parent?.errno || 1048,
      }
      throw customError;
   }
}

/**
 * Funcion para recuperar un video de la base por el id
 * @param {Number} id El id del video a buscar
 * @returns {IVideo | undefined} 
 */
const ShowByIdUnique = async (id) => {
   const transaction = await sequelize.transaction();
   try {
      const query = await Videos.findOne({ where: { id_unique: id } });
      await transaction.commit();
      if (query) {
         return query.dataValues;
      }
      return undefined;
   } catch (error) {
      await transaction.rollback();
      const customError = {
         message: error?.errors[0]?.message,
         type: error?.errors[0]?.type,
         path: error?.errors[0]?.path,
         value: error?.errors[0]?.value,
         code: error?.parent?.errno || 1048,
      }
      throw customError;
   }
}

/**
 * Registra un video en la base de datos
 * @param {IVideo} newVideo Es el nuevo video a registrar
 * @returns {IVideo}
 */
const Insert = async (newVideo) => {
   const transaction = await sequelize.transaction();
   try {
      const insertedVideo = await Videos.create(newVideo);
      await transaction.commit();
      return insertedVideo;
   } catch (error) {
      await transaction.rollback();
      const customError = {
         message: error?.errors[0]?.message,
         type: error?.errors[0]?.type,
         path: error?.errors[0]?.path,
         value: error?.errors[0]?.value,
         code: error?.parent?.errno || 1048,
      }
      throw customError;
   }
}

/**
 * Funcion para actualizar un video de la base
 * @param {IVideo} newVideo Es el nuevo video actualizado a registrar
 * @returns {IVideo}
 */
const Update = async (newVideo) => {
   const transaction = await sequelize.transaction();
   try {
      const video = await Videos.findByPk(newVideo.id_video);
      video.description = newVideo.description;
      video.link = newVideo.link;
      await video.save();
      await transaction.commit();
      return video;
   } catch (error) {
      await transaction.rollback();
      const customError = {
         message: error?.errors[0]?.message,
         type: error?.errors[0]?.type,
         path: error?.errors[0]?.path,
         value: error?.errors[0]?.value,
         code: error?.parent?.errno || 1048,
      }
      throw customError;
   }
}

/**
 * Funcion para eliminar un video
 * @param {Number} id El id del video a eliminar
 * @returns {void}
 */
const Delete = async (id) => {
   const transaction = await sequelize.transaction();
   try {
      await Videos.destroy({ where: { id_video: id } })
      await transaction.commit();
   } catch (error) {
      await transaction.rollback();
      const customError = {
         message: error?.errors[0]?.message,
         type: error?.errors[0]?.type,
         path: error?.errors[0]?.path,
         value: error?.errors[0]?.value,
         code: error?.parent?.errno || 1048,
      }
      throw customError;
   }
}

module.exports = { Videos, Show, ShowById, ShowByIdUnique, Insert, Update, Delete };
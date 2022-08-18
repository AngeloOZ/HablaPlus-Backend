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

/**
* @typedef {Object} IVideo
* @property {Number} [id_video] El Id del video
* @property {String} description La descripcion del video
* @property {String} link El iframe del video de YouTube
*/


/**
 * Funcion para recuperar todos los videos de la base
 * @returns {Array<IVideo>}
 */
const Show = async () => {
   try {
      const query = await Videos.findAll();
      return query;
   } catch (error) {
      throw new Error(error.message);
   }
}

/**
 * Funcion para recuperar un video de la base por el id
 * @param {Number} id El id del video a buscar
 * @returns {IVideo | undefined} 
 */
const ShowById = async (id) => {
   try {
      const query = await Videos.findByPk(id);
      if (query) {
         return query.dataValues;
      }
      return undefined;
   } catch (error) {
      throw new Error(error.message);
   }
}

/**
 * Registra un video en la base de datos
 * @param {IVideo} newVideo Es el nuevo video a registrar
 * @returns {IVideo}
 */
const Insert = async (newVideo) => {
   try {
      return insertedVideo = await Videos.create(newVideo);
   } catch (error) {
      throw new Error(error.message);
   }
}

/**
 * Funcion para actualizar un video de la base
 * @param {IVideo} newVideo Es el nuevo video actualizado a registrar
 * @returns {IVideo}
 */
const Update = async (newVideo) => {
   try {
      const video = await Videos.findByPk(newVideo.id_video);
      video.description = newVideo.description;
      video.link = newVideo.link;
      await video.save();
      return video;
   } catch (error) {
      throw new Error(error.message);
   }
}

/**
 * Funcion para eliminar un video
 * @param {Number} id El id del video a eliminar
 * @returns {void}
 */
const Delete = async (id) => {
   try {
      await Videos.destroy({ where: { id_video: id } })
   } catch (error) {
      throw new Error(error.message);
   }
}

module.exports = { Videos, Show, ShowById, Insert, Update, Delete };
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
   try {
      const query = await Videos.findAll();
      return query;
   } catch (error) {
      throw new Error(error.message);
   }
}

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

const Insert = async (newVideo = {}) => {
   try {
      return insertedVideo = await Videos.create(newVideo);
   } catch (error) {
      throw new Error(error.message);
   }
}

const Update = async ({ description, id_video, link }) => {
   try {
      const video = await Videos.findByPk(id_video);
      video.description = description;
      video.link = link;
      await video.save();
      return video;
   } catch (error) {
      throw new Error(error.message);
   }
}

const Delete = async (id) => {
   try {
      return await Videos.destroy({ where: { id_video: id } })
   } catch (error) {
      throw new Error(error.message);
   }
}

module.exports = { Videos, Show, ShowById, Insert, Update, Delete };
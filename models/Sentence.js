const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('./database');

const Sentence = sequelize.define('SENTENCE', {
   id_sentence: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
   },
   id_unique: {
      type: DataTypes.STRING,
      defaultValue: Sequelize.UUIDV4
   },
   sentence: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   pictograma_one: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   pictograma_two: {
      type: DataTypes.INTEGER,
      allowNull: false
   }

}, {
   timestamps: false,
});

/**
* @typedef {Object} ISentence
* @property {Number} [id_sentence] El Id de la oración
* @property {String} id_unique El Id de la oración unica uuid
* @property {String} sentence Esta es la oracion
* @property {Number} pictograma_one Id de referencia de la imagén de una palabra (Pictograma correcto) 
* @property {Number} pictograma_two Id de referencia de la imagén de una palabra (Pictograma incorrecto)
*/




/**
 * Funcion para recuperar todos las Oraciones de la base
 * @returns {Array<ISentence>}
 */
const Show = async () => {
   const transaction = await sequelize.transaction();
   try {
      const query = await Sentence.findAll();
      await transaction.commit();
      return query;
   } catch (error) {
      await transaction.rollback();
      throw error;
   }
}

/**
 * Funcion para recuperar una oracion de la base por el id
 * @param {Number} id El id de la oracion a buscar
 * @returns {ISentence | undefined} 
 */
const ShowById = async (id) => {
   const transaction = await sequelize.transaction();
   try {
      const query = await Sentence.findByPk(id);
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
 * Funcion para recuperar un oracion de la base por el id unico
 * @param {String} id El id unico del oracion a buscar
 * @returns {ISentence | undefined} 
 */
const ShowByIdUnique = async (id) => {
   const transaction = await sequelize.transaction();
   try {
      const query = await Sentence.findOne({ where: { id_unique: id } });
      await transaction.commit();
      if (query) {
         return query.dataValues;
      }
      return undefined;
   } catch (error) {
      await transaction.rollback();
      throw error;
   }
}

/**
 * Registra un oracion en la base de datos
 * @param {ISentence} newSentence Es la nueva oracion a registrar
 * @returns {ISentence}
 */
const Insert = async (newSentence) => {
   const transaction = await sequelize.transaction();
   try {
      const insertedSentence = await Sentence.create(newSentence);
      await transaction.commit();
      return insertedSentence;
   } catch (error) {
      await transaction.rollback();
      // const customError = {
      //    message: error?.errors[0]?.message,
      //    type: error?.errors[0]?.type,
      //    path: error?.errors[0]?.path,
      //    value: error?.errors[0]?.value,
      //    code: error?.parent?.errno || 1048,
      // }
      throw error;
   }
}

/**
 * Funcion para actualizar una oracion de la base
 * @param {ISentence} newSentence Es el nuevo oracion actualizado a registrar
 * @returns {ISentence}
 */
const Update = async (newSentence) => {
   const transaction = await sequelize.transaction();
   try {
      const oracion = await Sentence.findByPk(newSentence.id_sentence);
      oracion.sentence = newSentence.sentence;
      oracion.pictograma_one = newSentence.pictograma_one;
      oracion.pictograma_two = newSentence.pictograma_two;
      await oracion.save();
      await transaction.commit();
      return oracion;
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
 * Funcion para eliminar una oracion
 * @param {Number} id El id del oracion a eliminar
 * @returns {void}
 */
const Delete = async (id) => {
   const transaction = await sequelize.transaction();
   try {
      await Sentence.destroy({ where: { id_sentence: id } })
      await transaction.commit();
   } catch (error) {
      await transaction.rollback();
      throw error;
   }
}

module.exports = { Sentence, Show, ShowById, ShowByIdUnique, Insert, Update, Delete };
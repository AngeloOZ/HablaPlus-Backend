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

/**
* @typedef {Object} IWord
* @property {Number} [id_word] El Id de la palabra
* @property {String} description El nombre de la palabra
* @property {String} icon Url de la imagen de la palabra
* @property {Number} id_category El id de la categoria
*/

/**
 * Funcion para recuperar todos las palabras de la base
 * @returns {Array<IWord>}
 */
const Show = async () => {
   const transaction = await sequelize.transaction();
   try {
      const query = await Word.findAll();
      return query;
   } catch (error) {
      throw new Error(error);
   }
}

/**
 * Funcion para recuperar una palabra de la base por el id
 * @param {Number} id El id de la palabra a buscar
 * @returns {IWord | undefined} Regresa una palabra o undefined si no existe
 */
const ShowById = async (id) => {
   const transaction = await sequelize.transaction();
   try {
      const query = await Word.findByPk(id);
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
 * Funcion para recuperar una palabra de la base por el id
 * @param {Number} category El id de la categoria
 * @returns {Array<IWord>} 
 */
const ShowByCategory = async (category) => {
   const transaction = await sequelize.transaction()
   try {
      const query = await Word.findAll({ where: { id_category: category } });
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
 * Registra una palabra en la base de datos
 * @param {IWord} newWord Es la nueva palabra a registrar
 * @returns {IWord}
 */
const Insert = async (newWord) => {
   const transaction = await sequelize.transaction();
   try {
      const insertedWord = await Word.create(newWord);
      await transaction.commit();
      return insertedWord;
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
 * Funcion para actualizar una palabra de la base
 * @param {IWord} newWord Es la nueva palabra actualizado a registrar
 * @returns {IWord}
 */
const Update = async (newWord) => {
   const transaction = await sequelize.transaction();
   try {
      const word = await Word.findByPk(newWord.id_word);
      word.description = newWord.description;
      word.icon = newWord.icon;
      await word.save();
      await transaction.commit();
      return word;
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
 * Funcion para eliminar una palabra
 * @param {Number} id El id de la palabra a eliminar
 * @returns {void}
 */
const Delete = async (id) => {
   const transaction = await sequelize.transaction();
   try {
      await Word.destroy({ where: { id_word: id } })
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

module.exports = { Word, Show, ShowById, ShowByCategory, Insert, Update, Delete }
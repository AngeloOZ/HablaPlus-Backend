const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('./database');
const { Word } = require('./Word');

const Category = sequelize.define('CATEGORY', {
   id_category: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   description: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
   },
   icon: {
      type: DataTypes.STRING,
      allowNull: false
   },
   icon2: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
   },
   id_unique: {
      type: DataTypes.STRING,
      defaultValue: Sequelize.UUIDV4
   },
}, {
   timestamps: false,
})

Category.hasMany(Word, {
   // onDelete: 'RESTRICT',
   // onUpdate: 'RESTRICT',
   foreignKey: {
      name: 'id_category',
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   sourceKey: 'id_category'
})
Word.belongsTo(Category, {
   foreignKey: 'id_category',
   sourceKey: 'id_category'
})

/**
* @typedef {Object} ICategory
* @property {Number} [id_category] El Id de la categoria
* @property {String} description El nombre de la categoria
* @property {String} icon Url de la imagen de la categoria
* @property {String} icon2 Url de la imagen de la categoria
*/

/**
 * Funcion para recuperar todos las categorias de la base
 * @returns {Array<ICategory>}
 */
const Show = async () => {
   const transaction = await sequelize.transaction();
   try {
      const query = await Category.findAll();
      await transaction.commit();
      return query;
   } catch (error) {
      throw new Error(error.message);
   }
}

/**
 * Funcion para recuperar una categoria de la base por el id
 * @param {Number} id El id de la categoria a buscar
 * @returns {ICategory | undefined} Regresa una categoria o undefined si no existe
 */
const ShowById = async (id) => {
   const transaction = await sequelize.transaction();
   try {
      const query = await Category.findByPk(id);
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
 * Registra una categoria en la base de datos
 * @param {ICategory} newCategory Es la nueva categoria a registrar
 * @returns {ICategory}
 */

const Insert = async (newCategory) => {
   const transaction = await sequelize.transaction();
   try {
      const insertedCategory = await Category.create(newCategory);
      await transaction.commit();
      return insertedCategory;
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
 * Funcion para actualizar una categoria de la base
 * @param {ICategory} newCategory Es la nueva categoria actualizado a registrar
 * @returns {ICategory}
 */
const Update = async (newCategory) => {
   const transaction = await sequelize.transaction();
   try {
      const category = await Category.findByPk(newCategory.id_category);
      category.description = newCategory.description;
      category.icon = newCategory.icon;
      category.icon2 = newCategory.icon2;
      await category.save();
      await transaction.commit();
      return category;
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
 * Funcion para eliminar una categoria
 * @param {Number} id El id de la categoria a eliminar
 * @returns {void}
 */
const Delete = async (id) => {
   const transaction = await sequelize.transaction();
   try {
      await Category.destroy({ where: { id_category: id } })
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

module.exports = { Category, Show, ShowById, Insert, Update, Delete };
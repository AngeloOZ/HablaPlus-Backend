const { DataTypes } = require('sequelize');
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
   }
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
*/

/**
 * Funcion para recuperar todos las categorias de la base
 * @returns {Array<ICategory>}
 */
const Show = async () => {
   try {
      const query = await Category.findAll();
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
   try {
      const query = await Category.findByPk(id);
      if (query) {
         return query.dataValues;
      }
      return undefined;
   } catch (error) {
      throw new Error(error);
   }
}

/**
 * Registra una categoria en la base de datos
 * @param {ICategory} newCategory Es la nueva categoria a registrar
 * @returns {ICategory}
 */

const Insert = async (newCategory) => {
   try {
      return insertedCategory = await Category.create(newCategory);
   } catch (error) {
      throw new Error(error);
   }
}

/**
 * Funcion para actualizar una categoria de la base
 * @param {ICategory} newCategory Es la nueva categoria actualizado a registrar
 * @returns {ICategory}
 */
const Update = async (newCategory) => {
   try {
      const category = await Category.findByPk(newCategory.id_category);
      category.description = newCategory.description;
      category.icon = newCategory.icon;
      await category.save();
      return category;
   } catch (error) {
      console.table(error);
      throw new Error(error);
   }
}

/**
 * Funcion para eliminar una categoria
 * @param {Number} id El id de la categoria a eliminar
 * @returns {void}
 */
const Delete = async (id) => {
   try {
      await Category.destroy({ where: { id_category: id } })
   } catch (error) {
      throw new Error(error);
   }
}

module.exports = { Category, Show, ShowById, Insert, Update, Delete };
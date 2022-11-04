const { DataTypes } = require('sequelize');
const { sequelize } = require('./database');
const { User_avatar } = require('./User_avatar');
const { Word_learned } = require('./Word_learned');

const User = sequelize.define('USER', {
   id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   names: {
      type: DataTypes.STRING(50),
      allowNull: false
   },
   surname: {
      type: DataTypes.STRING(50),
      allowNull: false
   },
   age: {
      type: DataTypes.INTEGER,
      allowNull: true
   },
   username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
   },
   password: {
      type: DataTypes.STRING(100),
      allowNull: false
   }
}, {
   timestamps: false,
});

//TODO: Borrar relacion, no hay Score
// User.hasMany(Score, {
//    foreignKey: {
//       name: 'id_user',
//       type: DataTypes.INTEGER,
//       allowNull: false,
//    },
//    sourceKey: 'id_user'
// });
// Score.belongsTo(User, {
//    foreignKey: 'id_user',
//    sourceKey: 'id_user'
// });

User.hasMany(Word_learned, {
   foreignKey: {
      name: 'id_user',
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   sourceKey: 'id_user'
})
Word_learned.belongsTo(User, {
   foreignKey: 'id_user',
   sourceKey: 'id_user'
});

User.hasMany(User_avatar, {
   foreignKey: {
      name: 'id_user',
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   sourceKey: 'id_user'
})

User_avatar.belongsTo(User, {
   foreignKey: 'id_user',
   sourceKey: 'id_user'
})

/**
* @typedef {Object} IUser
* @property {Number} [id_user] El Id del usuario
* @property {String} names Los nombres del usuario
* @property {String} surname Los apellidos de los usuarios
* @property {Number} age La edad del usuario
* @property {String} username El nombre de pila de usuario, 
* @property {String} password La contrasenia del usuario
* @property {Number} id_type El id del tipo o rol del usuario
*/


/**
 * Funcion para recuperar todos los usuarios de la base
 * @returns {Array<IUser>}
 */
const Show = async () => {
   const transaction = await sequelize.transaction();
   try {
      const query = await User.findAll({ attributes: ['id_user', 'names', 'surname', 'age', 'username', 'id_type'] });
      await transaction.commit();
      return query;
   } catch (error) {
      await transaction.rollback();
      const customError = {
         message: error?.errors[0]?.message || error?.parent.sqlMessage,
         type: error?.errors[0]?.type,
         path: error?.errors[0]?.path,
         value: error?.errors[0]?.value,
         code: error?.parent?.errno || 1048,
      }
      throw customError;
   }
}

/**
 * Funcion para recuperar un Usuario de la base por el id
 * @param {Number} id El id del Usuario a buscar
 * @returns {IUser | undefined} 
 */
const ShowById = async (id) => {
   const transaction = await sequelize.transaction();
   try {
      const query = await User.findByPk(id);
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
 * Funcion para recuperar un Usuario de la base por el username
 * @param {String} username Nombre de usuario a buscar
 * @returns {IUser | undefined} 
 */
const ShowByUsername = async (username) => {
   const transaction = await sequelize.transaction();
   try {
      const query = await User.findOne({ where: { username } });
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
 * Registra un Usuario en la base de datos
 * @param {IUser} newUser Es el nuevo Usuario a registrar
 * @returns {IUser}
 */
const Insert = async (newUser) => {
   const transaction = await sequelize.transaction();
   try {
      const insertedUser = await User.create(newUser);
      await transaction.commit();
      return insertedUser;
   } catch (error) {
      await transaction.rollback();
      throw error;
   }
}

/**
 * Funcion para actualizar un Usuario de la base
 * @param {IUser} newUser Es el nuevo Usuario actualizado a registrar
 * @returns {IUser}
 */
const Update = async (newUser) => {
   const transaction = await sequelize.transaction();
   try {
      const user = await User.findByPk(newUser.id_user);
      user.names = newUser.names;
      user.surname = newUser.surname;
      user.age = newUser.age;
      user.username = newUser.username;
      if (newUser.password) {
         user.password = newUser.password;
      }
      user.id_type = newUser.id_type;

      await user.save();
      await transaction.commit();
      return user;
   } catch (error) {
      await transaction.rollback();
      throw error;
   }
}

/**
 * Funcion para eliminar un Usuario
 * @param {Number} id El id del Usuario a eliminar
 * @returns {void}
 */
const Delete = async (id) => {
   const transaction = await sequelize.transaction();
   try {
      await User.destroy({ where: { id_user: id } })
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

module.exports = { User, Show, ShowById, ShowByUsername, Insert, Update, Delete }
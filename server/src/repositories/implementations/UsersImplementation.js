const OperationResult = require("../../helpers/OperationResult");
const { sequelize } = require("../../infrastructure/db/dbconfig");
const User = require("../../infrastructure/Models/UsersModel")
const moment = require("moment")

const today = new Date().toISOString().split("T")[0];

class UsersImplementation {
  async findById(UserID) {
    try {
      const user = await User.findByPk(UserID);

      if (!user) return OperationResult.failure("Usuario no encontrado.");

      return OperationResult.success(user);
    } catch (error) {
      return OperationResult.failure("Error en la búsqueda de usuario.", error);
    }
  }

  async findByEmail(Email) {
    try {
      const user = await User.findOne({ where: { Email } });

      if (!user) return OperationResult.failure("Usuario no encontrado.");

      return OperationResult.success(user);
    } catch (error) {
      return OperationResult.failure("Error en la búsqueda de usuario.", error);
    }
  }

  async getAllUsers() {
    try {
      const users = await User.findAll();

      if (!users) return OperationResult.failure("Usuario no encontrado.");

      return OperationResult.success(users);
    } catch (error) {
      return OperationResult.failure("Error al obtener todos los usuarios.", error);
    }
  }


  async save(userData, transaction) {
    try {
      const newUser = await User.create({
        FirstName: userData.FirstName,
        LastName: userData.LastName,
        Email: userData.Email,
        Password: userData.Password,
        RoleID: userData.RoleID,
        CreatedAt: today,
        UpdatedAt: today,
        IsActive: userData.IsActive ?? true,
      }, { transaction });

      return OperationResult.success({ id: newUser.UserID });
    } catch (error) {
      return OperationResult.failure("Error al guardar el usuario.", error);
    }
  }

  async update(UserID, updatedFields) {
    try {
      const user = await User.findByPk(UserID);
      if (!user) return OperationResult.failure("Usuario no encontrado.");

      await user.update({
        ...updatedFields,
        UpdatedAt: new Date()
      });

      return OperationResult.success("Usuario actualizado correctamente.");
    } catch (error) {
      return OperationResult.failure("Error al actualizar el usuario.", error);
    }
  }

  async delete(UserID) {
    try {
      const user = await User.findByPk(UserID);
      if (!user) return OperationResult.failure("Usuario no encontrado.");

      await user.update({
        IsActive: false,
        UpdatedAt: new Date()
      });

      return OperationResult.success("Usuario desactivado correctamente.");
    } catch (error) {
      return OperationResult.failure("Error al eliminar el usuario.", error);
    }
  }

  // Metodo de logueo

  async findByCredentials(email, password) {
    try {
      const user = await User.findOne({
        where: { Email: email, Password: password, IsActive: true },
        attributes: ["UserID", "Email", "RoleID", "FirstName", "LastName"]
      });
  
      if (!user) return OperationResult.failure("Credenciales inválidas.");
      return OperationResult.success(user);
    } catch (error) {
      return OperationResult.failure("Error al buscar el usuario.", error);
    }
  }

  // Transacciones
  async startTransaction() {
    return await sequelize.transaction();
  }

  async commitTransaction(transaction) {
    await transaction.commit();
  }

  async rollbackTransaction(transaction) {
    await transaction.rollback();
  }
}

module.exports = new UsersImplementation();

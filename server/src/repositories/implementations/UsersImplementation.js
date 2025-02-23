const OperationResult = require("../../helpers/OperationResult");
const { sequelize } = require("../../infrastructure/db/dbconfig");
const { QueryTypes } = require("sequelize");
const moment = require("moment");


class UsersImplementation {
  async findById(UserID) {
    try {
      console.log("🔍 Buscando usuario con ID:", UserID);

      const user = await sequelize.query(
        `SELECT * FROM users.Users WHERE UserID = :UserID`, 
        { 
          replacements: { UserID }, 
          type: QueryTypes.SELECT 
        }
      );

      if (user.length === 0) return OperationResult.failure("Usuario no encontrado.");
      
      return OperationResult.success(user[0]);
    } catch (error) {
      return OperationResult.failure("Error en la búsqueda de usuario.", error);
    }
  }

  async findByEmail(Email) {
    try {
      console.log("🔍 Buscando usuario con Email:", Email);

      const user = await sequelize.query(
        `SELECT * FROM users.Users WHERE Email = :Email`, 
        { 
          replacements: { Email }, 
          type: QueryTypes.SELECT 
        }
      );

      if (user.length === 0) return OperationResult.failure("Usuario no encontrado.");
      
      return OperationResult.success(user[0]);
    } catch (error) {
      return OperationResult.failure("Error en la búsqueda de usuario.", error);
    }
  }
  async save(userData) {
    try {
      console.log("💾 Guardando usuario en BD:", userData);
  
      const formattedDate = moment().format("YYYY-MM-DD HH:mm:ss");
  
      const result = await sequelize.query(
        `INSERT INTO users.Users (FirstName, LastName, Email, Password, RoleID, CreatedAt, UpdatedAt, IsActive)
         VALUES (:FirstName, :LastName, :Email, :Password, :RoleID, :CreatedAt, :UpdatedAt, :IsActive)`,
        {
          replacements: {
            FirstName: userData.FirstName,
            LastName: userData.LastName,
            Email: userData.Email,
            Password: userData.Password,
            RoleID: userData.RoleID,
            CreatedAt: formattedDate, 
            UpdatedAt: formattedDate,
            IsActive: userData.IsActive !== undefined ? userData.IsActive : true
          },
          type: QueryTypes.INSERT,
        }
      );
  
      return OperationResult.success({ message: "Usuario guardado correctamente", result });
    } catch (error) {
      return OperationResult.failure("Error al guardar el usuario.", error);
    }
  }

  async update(UserID, updatedFields) {
    try {
      console.log("🛠️ Buscando usuario con ID:", UserID);

      // Verificar si el usuario existe
      const user = await sequelize.query(
        `SELECT * FROM users.Users WHERE UserID = :UserID`,
        { replacements: { UserID }, type: QueryTypes.SELECT }
      );

      if (!user.length) {
        return { success: false, message: "Usuario no encontrado." };
      }

      console.log("✅ Actualizando usuario con ID:", UserID, "Campos:", updatedFields);

      const formattedDate = new Date().toISOString().slice(0, 19).replace("T", " ");


      const result = await sequelize.query(
        `UPDATE users.Users
         SET FirstName = :FirstName, LastName = :LastName, Email = :Email, 
             Password = :Password, RoleID = :RoleID, UpdatedAt = :UpdatedAt
         WHERE UserID = :UserID`,
        {
          replacements: {
            UserID: parseInt(UserID),
            FirstName: updatedFields.FirstName,
            LastName: updatedFields.LastName,
            Email: updatedFields.Email,
            Password: updatedFields.Password,
            RoleID: updatedFields.RoleID,
            UpdatedAt: formattedDate,
          },
          type: QueryTypes.UPDATE,
        }
      );

      return { success: true, message: "Usuario actualizado correctamente", result };
    } catch (error) {
      return { success: false, message: "Error al actualizar el usuario.", error };
    }
  }



 async delete(UserID) {
    try {
      console.log("Desactivando usuario con ID:", UserID);

      const updatedAt = new Date().toISOString().slice(0, 19).replace("T", " ");

      const [result] = await sequelize.query(
        `UPDATE users.Users 
         SET IsActive = 0, UpdatedAt = :UpdatedAt 
         WHERE UserID = :UserID`,
        {
          replacements: { UserID, UpdatedAt: updatedAt },
          type: QueryTypes.UPDATE,
        }
      );

      if (result === 0) {
        return OperationResult.failure("Usuario no encontrado o ya desactivado.");
      }

      return OperationResult.success("Usuario desactivado correctamente.");
    } catch (error) {
      console.error("❌ Error al eliminar usuario:", error);
      return OperationResult.failure("Error al eliminar el usuario.", error);
    }
  }

}

module.exports = new UsersImplementation();

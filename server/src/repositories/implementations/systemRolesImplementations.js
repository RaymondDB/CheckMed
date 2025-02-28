const OperationResult = require("../../helpers/OperationResult");
const { sequelize } = require("../../infrastructure/db/dbconfig");
const { QueryTypes } = require("sequelize");
const moment = require("moment");

class RolesImplementation {
  async findById(RoleID) {
    try {
      console.log("🔍 Buscando rol con ID:", RoleID);

      const role = await sequelize.query(
        `SELECT * FROM system.Roles WHERE roleId = :RoleID`,
        { replacements: { RoleID }, type: QueryTypes.SELECT }
      );

      if (!role.length) return OperationResult.failure("Rol no encontrado.");

      return OperationResult.success(role[0]);
    } catch (error) {
      return OperationResult.failure("Error en la búsqueda del rol.", error);
    }
  }

  async findByName(RoleName) {
    try {
      console.log("🔍 Buscando rol con nombre:", RoleName);

      const role = await sequelize.query(
        `SELECT * FROM system.Roles WHERE roleName = :RoleName`,
        { replacements: { RoleName }, type: QueryTypes.SELECT }
      );

      if (!role.length) return OperationResult.failure("Rol no encontrado.");

      return OperationResult.success(role[0]);
    } catch (error) {
      return OperationResult.failure("Error en la búsqueda del rol.", error);
    }
  }

  async save(roleData) {
    try {
      console.log("💾 Guardando rol en BD:", roleData);

      const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

      const result = await sequelize.query(
        `INSERT INTO system.Roles (RoleName, CreatedAt, UpdatedAt, IsActive)
   VALUES (:RoleName, :CreatedAt, :UpdatedAt, :IsActive)`,
        {
          replacements: {
            RoleName: roleData.RoleName,
            CreatedAt: createdAt,
            UpdatedAt: createdAt,
            IsActive:
              roleData.IsActive !== undefined ? roleData.IsActive : true,
          },
          type: QueryTypes.INSERT,
        }
      );

      return OperationResult.success({
        message: "Rol guardado correctamente",
        result,
      });
    } catch (error) {
      return OperationResult.failure("Error al guardar el rol.", error);
    }
  }

  async delete(RoleID) {
    try {
      console.log("Eliminando rol con ID:", RoleID);

      const result = await sequelize.query(
        `DELETE FROM system.Roles WHERE roleId = :RoleID`,
        { replacements: { RoleID }, type: QueryTypes.DELETE }
      );

      if (result === 0) {
        return OperationResult.failure("Rol no encontrado.");
      }

      return OperationResult.success("Rol eliminado correctamente.");
    } catch (error) {
      return OperationResult.failure("Error al eliminar el rol.", error);
    }
  }
}

module.exports = new RolesImplementation();

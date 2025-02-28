const OperationResult = require("../../helpers/OperationResult");
const { sequelize } = require("../../infrastructure/db/dbconfig");
const { QueryTypes } = require("sequelize");
const moment = require("moment");

class StatusImplementation {
  async findById(StatusID) {
    try {
      console.log("🔍 Buscando estado con ID:", StatusID);

      const status = await sequelize.query(
        `SELECT * FROM system.Status WHERE statusId = :StatusID`,
        { replacements: { StatusID }, type: QueryTypes.SELECT }
      );

      if (!status.length)
        return OperationResult.failure("Estado no encontrado.");

      return OperationResult.success(status[0]);
    } catch (error) {
      return OperationResult.failure("Error en la búsqueda del estado.", error);
    }
  }

  async findByName(StatusName) {
    try {
      console.log("🔍 Buscando estado con nombre:", StatusName);

      const status = await sequelize.query(
        `SELECT * FROM system.Status WHERE statusName = :StatusName`,
        { replacements: { StatusName }, type: QueryTypes.SELECT }
      );

      if (!status.length)
        return OperationResult.failure("Estado no encontrado.");

      return OperationResult.success(status[0]);
    } catch (error) {
      return OperationResult.failure("Error en la búsqueda del estado.", error);
    }
  }

  async save(statusData) {
    try {
      console.log("💾 Guardando estado en BD:", statusData);

      const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

      const result = await sequelize.query(
        `INSERT INTO system.Status (statusName, createdAt, updatedAt)
         VALUES (:StatusName, :CreatedAt, :UpdatedAt)`,
        {
          replacements: {
            StatusName: statusData.StatusName,
            CreatedAt: createdAt,
            UpdatedAt: createdAt,
          },
          type: QueryTypes.INSERT,
        }
      );

      return OperationResult.success({
        message: "Estado guardado correctamente",
        result,
      });
    } catch (error) {
      return OperationResult.failure("Error al guardar el estado.", error);
    }
  }

  async delete(StatusID) {
    try {
      console.log(" Eliminando estado con ID:", StatusID);

      const result = await sequelize.query(
        `DELETE FROM system.Status WHERE statusId = :StatusID`,
        { replacements: { StatusID }, type: QueryTypes.DELETE }
      );

      if (result === 0) {
        return OperationResult.failure("Estado no encontrado.");
      }

      return OperationResult.success("Estado eliminado correctamente.");
    } catch (error) {
      return OperationResult.failure("Error al eliminar el estado.", error);
    }
  }
}

module.exports = new StatusImplementation();

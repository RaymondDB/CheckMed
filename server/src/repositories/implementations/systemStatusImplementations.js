const OperationResult = require("../../helpers/OperationResult");
const StatusModel = require("../../infrastructure/models/StatusModel");
const moment = require("moment");

const now = moment().format("YYYY-MM-DD HH:mm:ss");

class StatusImplementation {
  async findById(statusId) {
    try {
      console.log("🔍 Buscando estado con ID:", statusId);

      const status = await StatusModel.findByPk(statusId);

      if (!status) return OperationResult.failure("Estado no encontrado.");

      return OperationResult.success(status);
    } catch (error) {
      return OperationResult.failure("Error en la búsqueda del estado.", error);
    }
  }

  async findByName(statusName) {
    try {
      console.log("🔍 Buscando estado con nombre:", statusName);

      const status = await StatusModel.findOne({ where: { statusName } });

      if (!status) return OperationResult.failure("Estado no encontrado.");

      return OperationResult.success(status);
    } catch (error) {
      return OperationResult.failure("Error en la búsqueda del estado.", error);
    }
  }

  async findAll() {
    try {
      const statuses = await StatusModel.findAll();

      return OperationResult.success(statuses);
    } catch (error) {
      return OperationResult.failure("Error al obtener los estados.", error);
    }
  }

  async save(statusData, transaction) {
    try {
      console.log("💾 Guardando estado en BD:", statusData);

      const newStatus = await StatusModel.create(
        {
          statusName: statusData.StatusName,
          createdAt: now,
          updatedAt: now,
        },
        { transaction }
      );

      return OperationResult.success({
        message: "Estado guardado correctamente",
        id: newStatus.statusId,
      });
    } catch (error) {
      return OperationResult.failure("Error al guardar el estado.", error);
    }
  }

  async update(statusId, updatedFields) {
    try {
      const status = await StatusModel.findByPk(statusId);

      if (!status) return OperationResult.failure("Estado no encontrado.");

      await status.update({
        ...updatedFields,
        updatedAt: new Date(),
      });

      return OperationResult.success("Estado actualizado correctamente.");
    } catch (error) {
      return OperationResult.failure("Error al actualizar el estado.", error);
    }
  }

  async delete(statusId) {
    try {
      console.log("🗑️ Eliminando estado con ID:", statusId);

      const status = await StatusModel.findByPk(statusId);

      if (!status) return OperationResult.failure("Estado no encontrado.");

      await status.destroy();

      return OperationResult.success("Estado eliminado correctamente.");
    } catch (error) {
      return OperationResult.failure("Error al eliminar el estado.", error);
    }
  }
}

module.exports = new StatusImplementation();

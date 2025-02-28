const StatusRepository = require("../../repositories/implementations/systemStatusImplementations");
const EventBus = require("../listeners/eventBus");
const OperationResult = require("../../helpers/OperationResult");
const ValidationService = require("../services/validationService");

class StatusService {
  async createStatus(statusData) {
    console.log("🆕 Datos de estado recibidos:", statusData);

    if (!statusData || typeof statusData !== "object") {
      console.error("❌ Error: statusData no es un objeto válido:", statusData);
      return OperationResult.failure("Formato de datos incorrecto.");
    }

    const { StatusID, StatusName } = statusData;

    console.log("📌 Campos extraídos:");
    console.log("StatusID:", StatusID);
    console.log("StatusName:", StatusName);

    // **Validaciones obligatorias**
    if (!StatusName) {
      console.error("❌ Error: Falta el nombre del estado.");
      return OperationResult.failure("El nombre del estado es obligatorio.");
    }

    if (!ValidationService.isValidStatusName(StatusName)) {
      console.error("❌ Error: Nombre de estado inválido.");
      return OperationResult.failure(
        "El nombre del estado debe tener entre 3 y 50 caracteres."
      );
    }

    console.log("🔎 Verificando si el estado ya existe...");
    const existingStatus = await StatusRepository.findByName(StatusName);
    if (existingStatus.success && existingStatus.data) {
      console.error("❌ Error: El estado ya existe.");
      return OperationResult.failure(
        "El estado ya existe en la base de datos."
      );
    }

    // Crear objeto para guardar en la BD
    const statusToSave = {
      StatusID,
      StatusName,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    };

    console.log("💾 Guardando estado en BD:", statusToSave);

    const statusResult = await StatusRepository.save(statusToSave);

    if (statusResult.success) {
      console.log("✅ Estado guardado con éxito:", statusResult.data);
      EventBus.emit("StatusCreated", statusResult.data);
    } else {
      console.error("❌ Error al guardar el estado:", statusResult.error);
    }

    return statusResult;
  }

  async getStatusById(StatusID) {
    console.log("🔍 Buscando estado con ID:", StatusID);

    if (!ValidationService.isValidId(StatusID)) {
      console.error("❌ Error: ID de estado inválido.");
      return OperationResult.failure(
        "El ID del estado debe ser un número válido."
      );
    }

    const status = await StatusRepository.findById(StatusID);
    if (!status.success) {
      console.error("❌ Estado no encontrado.");
      return OperationResult.failure("Estado no encontrado.");
    }

    EventBus.emit("StatusFetched", status.data);
    return status;
  }

  async updateStatus(StatusID, updatedFields) {
    console.log("🛠️ Buscando estado con ID:", StatusID);

    if (!ValidationService.isValidId(StatusID)) {
      console.error("❌ Error: ID de estado inválido.");
      return OperationResult.failure(
        "El ID del estado debe ser un número válido."
      );
    }

    const status = await StatusRepository.findById(StatusID);
    if (!status.success) {
      console.error("❌ Estado no encontrado.");
      return OperationResult.failure("Estado no encontrado.");
    }

    if (
      updatedFields.StatusName &&
      !ValidationService.isValidStatusName(updatedFields.StatusName)
    ) {
      console.error("❌ Error: Nombre de estado inválido.");
      return OperationResult.failure(
        "El nombre del estado debe tener entre 3 y 50 caracteres."
      );
    }

    console.log(
      "✅ Actualizando estado con ID:",
      StatusID,
      "Campos:",
      updatedFields
    );

    updatedFields.UpdatedAt = new Date();

    const updateResult = await StatusRepository.update(StatusID, updatedFields);
    if (updateResult.success) {
      EventBus.emit("StatusUpdated", updateResult.data);
    }

    return updateResult;
  }

  async deleteStatus(StatusID) {
    console.log("🗑 Buscando estado con ID:", StatusID);

    if (!ValidationService.isValidId(StatusID)) {
      console.error("❌ Error: ID de estado inválido.");
      return OperationResult.failure(
        "El ID del estado debe ser un número válido."
      );
    }

    const status = await StatusRepository.findById(StatusID);
    if (!status.success) {
      console.error("❌ Estado no encontrado.");
      return OperationResult.failure("Estado no encontrado.");
    }

    console.log("🗑 Eliminando estado con ID:", StatusID);
    const deleteResult = await StatusRepository.delete(StatusID);

    if (deleteResult.success) {
      EventBus.emit("StatusDeleted", { StatusID });
    }

    return deleteResult;
  }
}

module.exports = new StatusService();

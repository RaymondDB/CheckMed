const StatusDomainService = require("../../domain/services/systemStatusService");
const StatusRepository = require("../../repositories/implementations/systemStatusImplementation");
const EventBus = require("../listeners/eventBus");
const OperationResult = require("../../helpers/OperationResult");
const ValidationService = require("../rules/statusRules");
const { sequelize } = require("../../infrastructure/db");

class StatusBService {
  constructor({ statusRepository }) {
    this.statusRepository = StatusRepository;
  }

  async createStatus(statusData) {
    console.log("🆕 Datos de estado recibidos:", statusData);

    if (!statusData || typeof statusData !== "object") {
      console.error("❌ Error: statusData no es un objeto válido:", statusData);
      return OperationResult.failure("Formato de datos incorrecto.");
    }

    // Validación con reglas de negocio
    const validation = StatusDomainService.validateRequiredFields(statusData);
    if (!validation.success) {
      console.error("❌ Error:", validation.message);
      return OperationResult.failure(validation.message);
    }

    if (!ValidationService.isValidStatusName(statusData.StatusName)) {
      console.error("❌ Error: Nombre de estado inválido.");
      return OperationResult.failure(
        "El nombre del estado debe tener entre 3 y 50 caracteres."
      );
    }

    console.log("🔎 Verificando si el estado ya existe...");
    const existingStatus = await this.statusRepository.findByName(
      statusData.StatusName
    );
    if (existingStatus.success && existingStatus.data) {
      console.error("❌ Error: El estado ya existe.");
      return OperationResult.failure(
        "El estado ya existe en la base de datos."
      );
    }

    // Crear objeto para guardar en la BD
    const statusToSave = {
      ...statusData,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    };

    console.log("💾 Guardando estado en BD:", statusToSave);

    const statusResult = await this.statusRepository.save(statusToSave);

    if (statusResult.success) {
      console.log("✅ Estado guardado con éxito:", statusResult.data);
      EventBus.emit("StatusCreated", statusResult.data);
    } else {
      console.error("❌ Error al guardar el estado:", statusResult.error);
    }

    return statusResult;
  }

  async getStatusById(statusID) {
    console.log("🔍 Buscando estado con ID:", statusID);

    if (!ValidationService.isValidStatusID(statusID)) {
      console.error("❌ Error: ID de estado inválido.");
      return OperationResult.failure(
        "El ID del estado debe ser un número válido."
      );
    }

    const status = await this.statusRepository.findById(statusID);
    if (!status.success) {
      console.error("❌ Estado no encontrado.");
      return OperationResult.failure("Estado no encontrado.");
    }

    EventBus.emit("StatusFetched", status.data);
    return status;
  }

  async updateStatus(statusID, updatedFields) {
    console.log("🛠️ Buscando estado con ID:", statusID);

    if (!ValidationService.isValidStatusID(statusID)) {
      console.error("❌ Error: ID de estado inválido.");
      return OperationResult.failure(
        "El ID del estado debe ser un número válido."
      );
    }

    const status = await this.statusRepository.findById(statusID);
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
      statusID,
      "Campos:",
      updatedFields
    );

    updatedFields.UpdatedAt = new Date();

    const updateResult = await this.statusRepository.update(
      statusID,
      updatedFields
    );
    if (updateResult.success) {
      EventBus.emit("StatusUpdated", updateResult.data);
    }

    return updateResult;
  }

  async deleteStatus(statusID) {
    console.log("🗑 Buscando estado con ID:", statusID);

    if (!ValidationService.isValidStatusID(statusID)) {
      console.error("❌ Error: ID de estado inválido.");
      return OperationResult.failure(
        "El ID del estado debe ser un número válido."
      );
    }

    const status = await this.statusRepository.findById(statusID);
    if (!status.success) {
      console.error("❌ Estado no encontrado.");
      return OperationResult.failure("Estado no encontrado.");
    }

    console.log("🗑 Eliminando estado con ID:", statusID);
    const deleteResult = await this.statusRepository.delete(statusID);

    if (deleteResult.success) {
      EventBus.emit("StatusDeleted", { statusID });
    }

    return deleteResult;
  }
}

module.exports = StatusBService;

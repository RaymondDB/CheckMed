const RoleRepository = require("../../repositories/implementations/systemRolesImplementations");
const EventBus = require("../listeners/eventBus");
const OperationResult = require("../../helpers/OperationResult");
const ValidationService = require("../services/validationService");

class RoleService {
  async createRole(roleData) {
    console.log("🆕 Datos de rol recibidos:", roleData);

    if (!roleData || typeof roleData !== "object") {
      console.error("❌ Error: roleData no es un objeto válido:", roleData);
      return OperationResult.failure("Formato de datos incorrecto.");
    }

    const { RoleID, RoleName, CreatedAt, UpdatedAt, IsActive } = roleData;

    console.log("📌 Campos extraídos:");
    console.log("RoleID:", RoleID);
    console.log("RoleName:", RoleName);
    console.log("CreatedAt:", CreatedAt);
    console.log("UpdatedAt:", UpdatedAt);
    console.log("IsActive:", IsActive);

    // **Validaciones obligatorias**
    if (!RoleName) {
      console.error("❌ Error: Falta el nombre del rol.");
      return OperationResult.failure("El nombre del rol es obligatorio.");
    }

    if (!ValidationService.isValidRoleName(RoleName)) {
      console.error("❌ Error: Nombre de rol inválido.");
      return OperationResult.failure(
        "El nombre del rol debe tener entre 3 y 50 caracteres."
      );
    }

    console.log("🔎 Verificando si el rol ya existe...");
    const existingRole = await RoleRepository.findByName(RoleName);
    if (existingRole.success && existingRole.data) {
      console.error("❌ Error: El rol ya existe.");
      return OperationResult.failure("El rol ya existe en la base de datos.");
    }

    // Crear objeto para guardar en la BD
    const roleToSave = {
      RoleID,
      RoleName,
      CreatedAt: CreatedAt || new Date(),
      UpdatedAt: UpdatedAt || new Date(),
      IsActive: IsActive !== undefined ? IsActive : true, // Activo por defecto
    };

    console.log("💾 Guardando rol en BD:", roleToSave);

    const roleResult = await RoleRepository.save(roleToSave);

    if (roleResult.success) {
      console.log("✅ Rol guardado con éxito:", roleResult.data);
      EventBus.emit("RoleCreated", roleResult.data);
    } else {
      console.error("❌ Error al guardar el rol:", roleResult.error);
    }

    return roleResult;
  }

  async getRoleById(RoleID) {
    console.log("🔍 Buscando rol con ID:", RoleID);

    const roleIdInt = parseInt(RoleID, 10);
    if (isNaN(roleIdInt) || roleIdInt <= 0) {
      console.error("❌ Error: ID de rol inválido.");
      return OperationResult.failure(
        "El ID del rol debe ser un número válido."
      );
    }

    const role = await RoleRepository.findById(RoleID);
    if (!role.success) {
      console.error("❌ Rol no encontrado.");
      return OperationResult.failure("Rol no encontrado.");
    }

    EventBus.emit("RoleFetched", role.data);
    return role;
  }

  async updateRole(RoleID, updatedFields) {
    console.log("🛠️ Buscando rol con ID:", RoleID);

    if (!ValidationService.isValidId(RoleID)) {
      console.error("❌ Error: ID de rol inválido.");
      return OperationResult.failure(
        "El ID del rol debe ser un número válido."
      );
    }

    const role = await RoleRepository.findById(RoleID);
    if (!role.success) {
      console.error("❌ Rol no encontrado.");
      return OperationResult.failure("Rol no encontrado.");
    }

    if (
      updatedFields.RoleName &&
      !ValidationService.isValidRoleName(updatedFields.RoleName)
    ) {
      console.error("❌ Error: Nombre de rol inválido.");
      return OperationResult.failure(
        "El nombre del rol debe tener entre 3 y 50 caracteres."
      );
    }

    console.log(
      "✅ Actualizando rol con ID:",
      RoleID,
      "Campos:",
      updatedFields
    );

    updatedFields.UpdatedAt = new Date();

    const updateResult = await RoleRepository.update(RoleID, updatedFields);
    if (updateResult.success) {
      EventBus.emit("RoleUpdated", updateResult.data);
    }

    return updateResult;
  }

  async deleteRole(RoleID) {
    console.log("🗑 Buscando rol con ID:", RoleID);

    console.log("🛠 Tipo de RoleID recibido:", typeof RoleID);
    console.log("🛠 Valor de RoleID:", RoleID);

    if (!ValidationService.isValidId(RoleID)) {
      console.error("❌ Error: ID de rol inválido.");
      return OperationResult.failure(
        "El ID del rol debe ser un número válido."
      );
    }

    const role = await RoleRepository.findById(RoleID);
    if (!role.success) {
      console.error("❌ Rol no encontrado.");
      return OperationResult.failure("Rol no encontrado.");
    }

    console.log("🗑 Eliminando rol con ID:", RoleID);
    const deleteResult = await RoleRepository.delete(RoleID);

    if (deleteResult.success) {
      EventBus.emit("RoleDeleted", { RoleID });
    }

    return deleteResult;
  }
}

module.exports = new RoleService();

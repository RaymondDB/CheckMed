const RoleDomainService = require("../../domain/services/systemRolesService");
const RoleRepository = require("../../repositories/implementations/systemRolesImplementation");
const EventBus = require("../listeners/eventBus");
const OperationResult = require("../../helpers/OperationResult");
const ValidationService = require("../rules/rolesRules");
const { sequelize } = require("../../infrastructure/db");

class RoleBService {
  constructor({ roleRepository }) {
    this.roleRepository = RoleRepository;
  }

  async createRole(roleData) {
    console.log("🆕 Datos de rol recibidos:", roleData);

    if (!roleData || typeof roleData !== "object") {
      console.error("❌ Error: roleData no es un objeto válido:", roleData);
      return OperationResult.failure("Formato de datos incorrecto.");
    }

    // Validación con reglas de negocio
    const validation = RoleDomainService.validateRequiredFields(roleData);
    if (!validation.success) {
      console.error("❌ Error:", validation.message);
      return OperationResult.failure(validation.message);
    }

    if (!ValidationService.isValidRoleName(roleData.RoleName)) {
      console.error("❌ Error: Nombre de rol inválido.");
      return OperationResult.failure(
        "El nombre del rol debe tener entre 3 y 50 caracteres."
      );
    }

    console.log("🔎 Verificando si el rol ya existe...");
    const existingRole = await this.roleRepository.findByName(
      roleData.RoleName
    );
    if (existingRole.success && existingRole.data) {
      console.error("❌ Error: El rol ya existe.");
      return OperationResult.failure("El rol ya existe en la base de datos.");
    }

    // Crear objeto para guardar en la BD
    const roleToSave = {
      ...roleData,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: roleData.IsActive !== undefined ? roleData.IsActive : true, // Activo por defecto
    };

    console.log("💾 Guardando rol en BD:", roleToSave);

    const roleResult = await this.roleRepository.save(roleToSave);

    if (roleResult.success) {
      console.log("✅ Rol guardado con éxito:", roleResult.data);
      EventBus.emit("RoleCreated", roleResult.data);
    } else {
      console.error("❌ Error al guardar el rol:", roleResult.error);
    }

    return roleResult;
  }

  async getRoleById(roleID) {
    console.log("🔍 Buscando rol con ID:", roleID);

    if (!ValidationService.isValidRoleID(roleID)) {
      console.error("❌ Error: ID de rol inválido.");
      return OperationResult.failure(
        "El ID del rol debe ser un número válido."
      );
    }

    const role = await this.roleRepository.findById(roleID);
    if (!role.success) {
      console.error("❌ Rol no encontrado.");
      return OperationResult.failure("Rol no encontrado.");
    }

    EventBus.emit("RoleFetched", role.data);
    return role;
  }

  async updateRole(roleID, updatedFields) {
    console.log("🛠️ Buscando rol con ID:", roleID);

    if (!ValidationService.isValidRoleID(roleID)) {
      console.error("❌ Error: ID de rol inválido.");
      return OperationResult.failure(
        "El ID del rol debe ser un número válido."
      );
    }

    const role = await this.roleRepository.findById(roleID);
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
      roleID,
      "Campos:",
      updatedFields
    );

    updatedFields.UpdatedAt = new Date();

    const updateResult = await this.roleRepository.update(
      roleID,
      updatedFields
    );
    if (updateResult.success) {
      EventBus.emit("RoleUpdated", updateResult.data);
    }

    return updateResult;
  }

  async deleteRole(roleID) {
    console.log("🗑 Buscando rol con ID:", roleID);

    if (!ValidationService.isValidRoleID(roleID)) {
      console.error("❌ Error: ID de rol inválido.");
      return OperationResult.failure(
        "El ID del rol debe ser un número válido."
      );
    }

    const role = await this.roleRepository.findById(roleID);
    if (!role.success) {
      console.error("❌ Rol no encontrado.");
      return OperationResult.failure("Rol no encontrado.");
    }

    console.log("🗑 Eliminando rol con ID:", roleID);
    const deleteResult = await this.roleRepository.delete(roleID);

    if (deleteResult.success) {
      EventBus.emit("RoleDeleted", { roleID });
    }

    return deleteResult;
  }
}

module.exports = RoleBService;

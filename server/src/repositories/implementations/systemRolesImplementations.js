const OperationResult = require("../../helpers/OperationResult");
const RoleModel = require("../../infrastructure/Models/RolesModel");
const moment = require("moment");

const now = moment().format("YYYY-MM-DD HH:mm:ss");

class RolesImplementation {
  async findById(roleId) {
    try {
      const role = await RoleModel.findByPk(roleId);

      if (!role) return OperationResult.failure("Rol no encontrado.");

      return OperationResult.success(role);
    } catch (error) {
      return OperationResult.failure("Error en la búsqueda del rol.", error);
    }
  }

  async findByName(roleName) {
    try {
      const role = await RoleModel.findOne({ where: { roleName } });

      if (!role) return OperationResult.failure("Rol no encontrado.");

      return OperationResult.success(role);
    } catch (error) {
      return OperationResult.failure("Error en la búsqueda del rol.", error);
    }
  }

  async findAll() {
    try {
      const roles = await RoleModel.findAll();

      return OperationResult.success(roles);
    } catch (error) {
      return OperationResult.failure("Error al obtener los roles.", error);
    }
  }

  async save(roleData, transaction) {
    try {
      const role = await RoleModel.create(
        {
          roleName: roleData.RoleName,
          isActive: roleData.IsActive !== undefined ? roleData.IsActive : true,
          createdAt: now,
          updatedAt: now,
        },
        { transaction }
      );

      return OperationResult.success({
        message: "Rol guardado correctamente",
        id: role.roleId,
      });
    } catch (error) {
      return OperationResult.failure("Error al guardar el rol.", error);
    }
  }

  async update(roleId, updatedFields) {
    try {
      const role = await RoleModel.findByPk(roleId);

      if (!role) return OperationResult.failure("Rol no encontrado.");

      await role.update({
        ...updatedFields,
        updatedAt: new Date(),
      });

      return OperationResult.success("Rol actualizado correctamente.");
    } catch (error) {
      return OperationResult.failure("Error al actualizar el rol.", error);
    }
  }

  async delete(roleId) {
    try {
      const role = await RoleModel.findByPk(roleId);

      if (!role) return OperationResult.failure("Rol no encontrado.");

      // Desactivación lógica
      await role.update({
        isActive: false,
        updatedAt: new Date(),
      });

      return OperationResult.success("Rol desactivado correctamente.");
    } catch (error) {
      return OperationResult.failure("Error al eliminar el rol.", error);
    }
  }
}

module.exports = new RolesImplementation();

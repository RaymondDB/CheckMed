const RoleName = require("../valueObjects/RoleName");

class Roles {
  constructor(roleId, roleName, createdAt, updatedAt, isActive) {
    this.roleId = roleId;
    this.roleName = new RoleName(roleName); // Validar el nombre del rol
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || null;
    this.isActive = isActive !== undefined ? isActive : true; // Activo por defecto
  }

  updateRoleName(newRoleName) {
    this.roleName = new RoleName(newRoleName); // Validar nuevo nombre del rol
    this.updatedAt = new Date();
  }

  deactivateRole() {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  isRoleAllowed(allowedRoles) {
    return allowedRoles.includes(this.roleName.roleName);
  }
}

module.exports = Roles;

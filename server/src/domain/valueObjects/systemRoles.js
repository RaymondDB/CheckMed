class RoleValidator {
  constructor(userRole, allowedRoles) {
    if (!this.isValidRole(userRole, allowedRoles)) {
      throw new Error("Acceso denegado: Rol no autorizado.");
    }
    this.userRole = userRole;
  }

  isValidRole(userRole, allowedRoles) {
    if (!userRole || !Array.isArray(allowedRoles)) {
      console.error("Datos de entrada inválidos");
      return false;
    }
    return allowedRoles.includes(userRole);
  }
}

module.exports = RoleValidator;

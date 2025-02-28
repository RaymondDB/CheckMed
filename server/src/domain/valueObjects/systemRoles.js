class RoleName {
  constructor(roleName) {
    if (!this.isValidRoleName(roleName)) {
      throw new Error(
        "Nombre de rol inválido: No puede estar vacío y debe tener entre 3 y 50 caracteres."
      );
    }
    this.roleName = roleName;
  }

  isValidRoleName(roleName) {
    return (
      typeof roleName === "string" &&
      roleName.trim().length >= 3 &&
      roleName.trim().length <= 50
    );
  }
}

module.exports = RoleName;

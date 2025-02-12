class roles {
  constructor(roleId, roleName, createdAt, updatedAt, isActive) {
    this.roleId = roleId;
    this.roleName = roleName;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || null;
    this.isActive = isActive;
  }
}

module.exports = roles;

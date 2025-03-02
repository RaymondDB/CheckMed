class RoleDTO {
  constructor({ RoleID, RoleName, CreatedAt, UpdatedAt, IsActive }) {
    this.id = RoleID;
    this.name = RoleName;
    this.createdAt = CreatedAt;
    this.updatedAt = UpdatedAt;
    this.isActive = IsActive;
  }

  static fromModel(roleModel) {
    return new RoleDTO({
      RoleID: roleModel.RoleID,
      RoleName: roleModel.RoleName,
      CreatedAt: roleModel.CreatedAt,
      UpdatedAt: roleModel.UpdatedAt,
      IsActive: roleModel.IsActive,
    });
  }
}

module.exports = RoleDTO;

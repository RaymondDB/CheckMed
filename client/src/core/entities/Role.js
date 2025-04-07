export class Role {
  constructor({ RoleID, RoleName, CreatedAt, UpdatedAt, IsActive }) {
    this.RoleID = RoleID;
    this.RoleName = RoleName;
    this.CreatedAt = CreatedAt;
    this.UpdatedAt = UpdatedAt;
    this.IsActive = IsActive;
  }
}

export class User {
  constructor({ id, firstName, lastName, email, password, roleId, isActive }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
    this.isActive = isActive ?? true;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  static fromDTO(dto) {
    return new User({
      id: dto.UserID,
      firstName: dto.FirstName,
      lastName: dto.LastName,
      email: dto.Email,
      password: dto.Password,
      roleId: dto.RoleID,
      isActive: dto.IsActive,
    });
  }

  toDTO() {
    return {
      UserID: this.id,
      FirstName: this.firstName,
      LastName: this.lastName,
      Email: this.email,
      Password: this.password,
      RoleID: this.roleId,
      IsActive: this.isActive,
    };
  }
}

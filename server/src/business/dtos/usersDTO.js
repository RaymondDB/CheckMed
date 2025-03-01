class UserDTO {
    constructor({ id, firstName, lastName, email, role, createdAt }) {
      this.id = id;
      this.fullName = `${firstName} ${lastName}`;
      this.email = email;
      this.role = role;
      this.createdAt = createdAt;
    }
  
    static fromModel(userModel) {
      return new UserDTO({
        id: userModel.id,
        firstName: userModel.FirstName,
        lastName: userModel.LastName,
        email: userModel.Email,
        role: userModel.RoleID,
        createdAt: userModel.CreatedAt,
      });
    }
  }
  
  module.exports = UserDTO;
  
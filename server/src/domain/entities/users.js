const EmailValid = require('../valueObjects/userEmail');

class User {
  constructor(id, firstName, lastName, email, password, roleId, createdAt, updatedAt, isActive) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = new EmailValid(email);  // Validación del correo electrónico
    this.password = password;     
    this.roleId = roleId;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || null;
    this.isActive = isActive;
  }

  updateEmail(newEmail) {
    this.email = new Email(newEmail);
    this.updatedAt = new Date();
  }

 /* deactivateUser() {
    this.isActive = false;
    this.updatedAt = new Date();
  }*/
}

module.exports = User;

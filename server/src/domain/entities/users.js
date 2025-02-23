const EmailValid = require('../valueObjects/userEmail');

class User {
  constructor(id, firstName, lastName, email, password, roleId, createdAt, updatedAt, isActive) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = new EmailValid(email); // Validación de email
    this.password = password;  
    this.roleId = roleId;
    this.createdAt = createdAt || new Date(); // Si no hay fecha, se pone la actual
    this.updatedAt = updatedAt || new Date(); // Evitar valores nulos
    this.isActive = isActive !== undefined ? isActive : true; // Valor por defecto: true
  }

  updateEmail(newEmail) {
    this.email = new EmailValid(newEmail); // Validar nuevo email
    this.updatedAt = new Date();
  }

  deactivateUser() {
    this.isActive = false;
    this.updatedAt = new Date();
  }
}

module.exports = User;

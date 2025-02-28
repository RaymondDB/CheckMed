class ValidationService {
  /**
   * Verifica si un correo electrónico es válido
   * @param {string} email
   * @returns {boolean}
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Verifica si una contraseña cumple con los requisitos
   * @param {string} password
   * @returns {boolean}
   */
  static isValidPassword(password) {
    // Requiere al menos 8 caracteres, 1 letra mayúscula, 1 número y 1 carácter especial
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  /**
   * Verifica si un número de teléfono es válido
   * @param {string} phoneNumber
   * @returns {boolean}
   */
  static isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phoneNumber);
  }

  /**
   * Verifica si un ID es un número válido
   * @param {number} id
   * @returns {boolean}
   */
  static isValidId(id) {
    return Number.isInteger(Number(id)) && id > 0;
  }

  /**
   * Verifica si un mensaje de notificación es válido
   * @param {string} message
   * @returns {boolean}
   */
  static isValidNotificationMessage(message) {
    return (
      typeof message === "string" &&
      message.trim().length > 0 &&
      message.length <= 255
    );
  }

  /**
   * Verifica si un nombre de rol es válido
   * @param {string} roleName
   * @returns {boolean}
   */
  static isValidRoleName(roleName) {
    return (
      typeof roleName === "string" &&
      roleName.trim().length >= 3 &&
      roleName.length <= 50
    );
  }

  /**
   * Verifica si un nombre de estado es válido
   * @param {string} statusName
   * @returns {boolean}
   */
  static isValidStatusName(statusName) {
    return (
      typeof statusName === "string" &&
      statusName.trim().length >= 3 &&
      statusName.length <= 50
    );
  }
}

module.exports = ValidationService;

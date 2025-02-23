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
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
     * Verifica si un número de licencia médica es válido
     * @param {string} licenseNumber
     * @returns {boolean}
     */
    static isValidLicenseNumber(licenseNumber) {
      return typeof licenseNumber === "string" && licenseNumber.length >= 6;
    }
  
    /**
     * Verifica si un ID es un número válido
     * @param {number} id
     * @returns {boolean}
     */
    static isValidId(id) {
      return Number.isInteger(id) && id > 0;
    }
  }
  
  module.exports = ValidationService;
  
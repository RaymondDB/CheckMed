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
      return Number.isInteger(id) && id > 0;
    }
  }
  
  module.exports = ValidationService;
  
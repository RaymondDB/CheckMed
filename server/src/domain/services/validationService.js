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
     * Verifica si un campo no excede de su longitud maxima
     * @param {string} field
     * @param {int} maxLenght
     * @returns {boolean}
     */
        static isValidFieldLenght(field, maxLenght) {
          if(!field || !maxLenght) {
            return true
          }
          return field.length <= maxLenght;
        }

     /**
     * Verifica si la cobertura maxima es valida
     * @param {} MaxCoverageAmount
     * @returns {boolean}
     */
      static isValidMaxCoverageAmount(MaxCoverageAmount) {
        const regex = /^\d{1,3}(\.\d{1,2})?$/;
          if (typeof MaxCoverageAmount !== 'number') {
            return false;
          }
          const number = parseFloat(MaxCoverageAmount);
          if (number < 0 || number > 100) {
            return false;
          }
          return regex.test(MaxCoverageAmount.toString()) ;
        }

    /**
     * Verifica si un ID es un número válSido
     * @param {number} id
     * @returns {boolean}
     */
    static isValidId(id) {
      return  id > 0;
    }
  }
  
  module.exports = ValidationService;
  
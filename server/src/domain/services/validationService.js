class ValidationService {
    static validateDate(date) {
      if (!Date.parse(date)) {
        throw new Error('Invalid date format');
      }
    }
  
    static validateClient(client) {
      if (!client || client.trim() === '') {
        throw new Error('Client information is required');
      }
    }
  }
  
  module.exports = ValidationService;
  
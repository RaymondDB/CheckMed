class StatusError extends Error {
    static statusNotFound() {
      return new StatusError('The provided status does not exist.');
    }
  
    constructor(message) {
      super(message);
      this.name = 'StatusError';
    }
  }
  
  module.exports = StatusError;
  
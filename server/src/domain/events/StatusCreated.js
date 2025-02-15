class AppointmentError extends Error {
    constructor(message) {
      super(message);
      this.name = 'AppointmentError';
    }
  
    static doctorUnavailable() {
      return new AppointmentError("The doctor is unavailable at the chosen time.");
    }
  
    static pastDate() {
      return new AppointmentError("The selected date is in the past.");
    }
  }
  
  class StatusError extends Error {
    constructor(message) {
      super(message);
      this.name = 'StatusError';
    }
  
    static statusNotFound() {
      return new StatusError("The specified status could not be found.");
    }
  }
  
  // Exports
  module.exports = { AppointmentError, StatusError };
  
class AppointmentError extends Error {
  static doctorUnavailable() {
    return new AppointmentError('Doctor is unavailable for the selected appointment.');
  }

  static pastDate() {
    return new AppointmentError('The appointment date is in the past.');
  }

  constructor(message) {
    super(message);
    this.name = 'AppointmentError';
  }
}

module.exports = AppointmentError;

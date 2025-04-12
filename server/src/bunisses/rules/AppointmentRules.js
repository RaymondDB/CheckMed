class AppointmentRules {
  static validateDate(date) {
    // Check if date is valid
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return false;
    }

    // Check if date is in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateObj >= today;
  }

  static validateStatusId(statusId) {
    return Number.isInteger(statusId) && statusId > 0;
  }

  static validatePatientName(patientName) {
    return typeof patientName === 'string' && patientName.trim().length > 0;
  }

  static validateAppointmentData(appointmentData) {
    // Required fields
    if (!appointmentData.date || !appointmentData.statusId || !appointmentData.patientName) {
      return false;
    }

    // Validate each field
    return (
      this.validateDate(appointmentData.date) &&
      this.validateStatusId(appointmentData.statusId) &&
      this.validatePatientName(appointmentData.patientName)
    );
  }
}

module.exports = AppointmentRules;
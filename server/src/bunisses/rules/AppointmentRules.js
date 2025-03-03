class AppointmentRules {
    static validate(appointment) {
      if (!appointment.date) throw new Error("Appointment date is required");
      if (!appointment.client) throw new Error("Client information is required");
      if (!appointment.service) throw new Error("Service type is required");
    }
  }
  
  module.exports = AppointmentRules;
  
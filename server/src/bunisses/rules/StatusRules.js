class StatusRules {
    static validate(status) {
      if (!status.appointmentId) throw new Error("Appointment ID is required");
      if (!status.status) throw new Error("Status is required");
    }
  }
  
  module.exports = StatusRules;
  
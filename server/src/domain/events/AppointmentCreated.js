class AppointmentCreated {
    constructor(appointment) {
      if (!appointment) {
        throw new Error("Appointment is required");
      }
      this.appointment = appointment;
      this.timestamp = new Date();
    }
  
    getAppointment() {
      return this.appointment;
    }
  
    getTimestamp() {
      return this.timestamp;
    }
  }
  
  class AppointmentUpdated {
    constructor(appointment) {
      if (!appointment) {
        throw new Error("Appointment is required");
      }
      this.appointment = appointment;
      this.timestamp = new Date();
    }
  
    getAppointment() {
      return this.appointment;
    }
  
    getTimestamp() {
      return this.timestamp;
    }
  }
  
  class AppointmentDeleted {
    constructor(appointmentId) {
      if (!appointmentId) {
        throw new Error("Appointment ID is required");
      }
      this.appointmentId = appointmentId;
      this.timestamp = new Date();
    }
  
    getAppointmentId() {
      return this.appointmentId;
    }
  
    getTimestamp() {
      return this.timestamp;
    }
  }
  
  module.exports = {
    AppointmentCreated,
    AppointmentUpdated,
    AppointmentDeleted
  };
  
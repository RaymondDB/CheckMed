const AppointmentDate = require("./AppointmentDate");

class Appointment {
  constructor(appointmentID, patientID, doctorID, appointmentDate, statusID, createdAt, updatedAt) {
    this.appointmentID = appointmentID;
    this.patientID = patientID;
    this.doctorID = doctorID;
    this.appointmentDate = new AppointmentDate(appointmentDate); // Usamos el Value Object
    this.statusID = statusID;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getAppointmentDate() {
    return this.appointmentDate.getDate();
  }

  isValid() {
    return this.appointmentID && this.patientID && this.doctorID && this.appointmentDate && this.statusID;
  }
}

module.exports = Appointment;

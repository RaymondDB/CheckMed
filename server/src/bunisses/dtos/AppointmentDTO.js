class AppointmentDTO {
  constructor(appointment) {
    this.id = appointment.id;
    this.date = appointment.date;
    this.statusId = appointment.statusId;
    this.patientName = appointment.patientName;
    this.createdAt = appointment.createdAt;
    this.updatedAt = appointment.updatedAt;
  }

  static fromEntity(appointment) {
    return new AppointmentDTO(appointment);
  }

  static fromEntities(appointments) {
    return appointments.map(appointment => AppointmentDTO.fromEntity(appointment));
  }
}

module.exports = AppointmentDTO;
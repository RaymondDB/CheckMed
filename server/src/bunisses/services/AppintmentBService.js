const AppointmentDTO = require('../dtos/AppointmentDTO');
const AppointmentRules = require('../rules/AppointmentRules');

class AppointmentBServices {
  async create(appointmentData) {
    AppointmentRules.validate(appointmentData);
    const appointment = new AppointmentDTO(
      appointmentData.id,
      appointmentData.date,
      appointmentData.client,
      appointmentData.service
    );
    return appointment;
  }

  async getAll() {
    return [
      new AppointmentDTO(1, '2025-03-05', 'John Doe', 'Haircut'),
      new AppointmentDTO(2, '2025-03-06', 'Jane Smith', 'Shave')
    ];
  }
}

module.exports = new AppointmentBServices();

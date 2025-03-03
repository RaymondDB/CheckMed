const Appointment = require('../entities/Appointment');
const AppointmentEvents = require('../events/AppointmentEvents');
const AppointmentBServices = require('../../business/services/AppointmentBServices');

class AppointmentService {
  static async create(appointmentData) {
    const appointment = new Appointment(
      appointmentData.id,
      appointmentData.date,
      appointmentData.client,
      appointmentData.service
    );
    await AppointmentBServices.create(appointmentData);
    AppointmentEvents.appointmentCreated(appointment);
    return appointment;
  }

  static async getAll() {
    return await AppointmentBServices.getAll();
  }

  static async update(appointmentData) {
    const appointment = new Appointment(
      appointmentData.id,
      appointmentData.date,
      appointmentData.client,
      appointmentData.service
    );
    AppointmentEvents.appointmentUpdated(appointment);
    return appointment;
  }
}

module.exports = AppointmentService;

const AppointmentRepository = require('../interfaces/AppointmentRepository');
const { AppointmentModel } = require('../../infrastructure/models');

class AppointmentImplementation extends AppointmentRepository {
  async save(appointment) {
    try {
      const newAppointment = await AppointmentModel.create(appointment);
      return newAppointment;
    } catch (error) {
      throw new Error('Error saving appointment: ' + error.message);
    }
  }

  async findById(id) {
    try {
      const appointment = await AppointmentModel.findByPk(id);
      if (!appointment) throw new Error('Appointment not found');
      return appointment;
    } catch (error) {
      throw new Error('Error finding appointment: ' + error.message);
    }
  }

  async findAll() {
    try {
      const appointments = await AppointmentModel.findAll();
      return appointments;
    } catch (error) {
      throw new Error('Error fetching appointments: ' + error.message);
    }
  }

  async update(id, appointmentData) {
    try {
      const appointment = await AppointmentModel.findByPk(id);
      if (!appointment) throw new Error('Appointment not found');

      await appointment.update(appointmentData);
      return appointment;
    } catch (error) {
      throw new Error('Error updating appointment: ' + error.message);
    }
  }

  async delete(id) {
    try {
      const appointment = await AppointmentModel.findByPk(id);
      if (!appointment) throw new Error('Appointment not found');

      await appointment.destroy();
      return { message: 'Appointment deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting appointment: ' + error.message);
    }
  }
}

module.exports = AppointmentImplementation;

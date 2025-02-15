const { Appointment } = require("../../infrastructure/models");
const IAppointmentRepository = require("../IAppointmentRepository");

class AppointmentRepositoryImpl extends IAppointmentRepository {
  async save(appointmentData) {
    return await Appointment.create(appointmentData);
  }

  async findById(id) {
    return await Appointment.findByPk(id);
  }

  async findAll() {
    return await Appointment.findAll();
  }

  async update(id, appointmentData) {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) return null;

    return await appointment.update(appointmentData);
  }

  async delete(id) {
    return await Appointment.destroy({ where: { appointmentID: id } });
  }
}

module.exports = new AppointmentRepositoryImpl();

const { eventBus } = require('./config');

class AppointmentEvents {
  static appointmentCreated(appointment) {
    eventBus.emit('appointmentCreated', appointment);
  }

  static appointmentUpdated(appointment) {
    eventBus.emit('appointmentUpdated', appointment);
  }
}

module.exports = AppointmentEvents;

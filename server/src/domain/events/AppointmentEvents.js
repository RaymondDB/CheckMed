const EVENT_TYPES = require('./config/eventTypes');

class AppointmentEvents {
  static created(appointmentDTO) {
    return {
      type: EVENT_TYPES.APPOINTMENT.CREATED,
      payload: appointmentDTO,
      timestamp: new Date()
    };
  }

  static updated(appointmentDTO) {
    return {
      type: EVENT_TYPES.APPOINTMENT.UPDATED,
      payload: appointmentDTO,
      timestamp: new Date()
    };
  }

  static deleted(appointmentId) {
    return {
      type: EVENT_TYPES.APPOINTMENT.DELETED,
      payload: { id: appointmentId },
      timestamp: new Date()
    };
  }

  static statusChanged(appointmentDTO, oldStatusId, newStatusId) {
    return {
      type: EVENT_TYPES.APPOINTMENT.STATUS_CHANGED,
      payload: {
        appointment: appointmentDTO,
        oldStatusId,
        newStatusId
      },
      timestamp: new Date()
    };
  }
}

module.exports = AppointmentEvents;

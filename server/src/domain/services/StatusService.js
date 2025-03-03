const Status = require('../entities/Status');
const StatusEvents = require('../events/StatusEvents');
const StatusBServices = require('../../business/services/StatusBServices');

class StatusService {
  static async update(appointmentId, statusData) {
    const status = new Status(appointmentId, statusData.status);
    await StatusBServices.update(appointmentId, statusData);
    StatusEvents.statusUpdated(status);
    return status;
  }

  static async getByAppointmentId(appointmentId) {
    return await StatusBServices.getByAppointmentId(appointmentId);
  }
}

module.exports = StatusService;

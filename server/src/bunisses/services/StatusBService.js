const StatusDTO = require('../dtos/StatusDTO');
const StatusRules = require('../rules/StatusRules');

class StatusBServices {
  async update(id, statusData) {
    StatusRules.validate(statusData);
    const status = new StatusDTO(id, statusData.status);
    return status;
  }

  async getByAppointmentId(appointmentId) {
    return new StatusDTO(appointmentId, 'Scheduled');
  }
}

module.exports = new StatusBServices();

const AppointmentRules = require('../../bunisses/rules/AppointmentRules');
const StatusRules = require('../../bunisses/rules/StatusRules');

class ValidationService {
  constructor(statusRepository) {
    this.statusRepository = statusRepository;
  }

  validateAppointment(appointmentData, isUpdate = false) {
    return AppointmentRules.validateAppointmentData(appointmentData);
  }

  async validateStatus(statusData, isUpdate = false) {
    // Basic validation
    if (!StatusRules.validateStatusData(statusData)) {
      return false;
    }

    // Check name uniqueness if needed
    if (statusData.name) {
      const existingStatuses = await this.statusRepository.findAll();
      if (!StatusRules.validateUniqueStatusName(statusData.name, existingStatuses)) {
        return false;
      }
    }

    return true;
  }
}

module.exports = ValidationService;
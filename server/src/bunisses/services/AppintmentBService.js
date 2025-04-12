const AppointmentDTO = require('../dtos/AppointmentDTO');
const AppointmentRules = require('../rules/AppointmentRules');

class AppointmentBServices {
  constructor(appointmentRepository, statusRepository) {
    this.appointmentRepository = appointmentRepository;
    this.statusRepository = statusRepository;
  }

  async validateAppointmentData(appointmentData, isUpdate = false, appointmentId = null) {
    // Validate basic appointment data
    if (!AppointmentRules.validateAppointmentData(appointmentData)) {
      return {
        isValid: false,
        message: 'Invalid appointment data'
      };
    }

    // Check if status exists
    const status = await this.statusRepository.findById(appointmentData.statusId);
    if (!status) {
      return {
        isValid: false,
        message: 'Status not found'
      };
    }

    // For updates, check if appointment exists
    if (isUpdate && appointmentId) {
      const existingAppointment = await this.appointmentRepository.findById(appointmentId);
      if (!existingAppointment) {
        return {
          isValid: false,
          message: 'Appointment not found'
        };
      }
    }

    return {
      isValid: true
    };
  }

  async transformAppointmentsToDTO(appointments) {
    return AppointmentDTO.fromEntities(appointments);
  }

  async transformAppointmentToDTO(appointment) {
    return AppointmentDTO.fromEntity(appointment);
  }
}

module.exports = AppointmentBServices;
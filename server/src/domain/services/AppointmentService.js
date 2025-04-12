const Appointment = require('../entities/Appointment');
const AppointmentDTO = require('../../bunisses/dtos/AppointmentDTO');
const AppointmentEvents = require('../events/AppointmentEvents');

class AppointmentService {
  constructor(appointmentRepository, validationService, eventBus) {
    this.appointmentRepository = appointmentRepository;
    this.validationService = validationService;
    this.eventBus = eventBus;
  }

  async getAllAppointments() {
    const appointments = await this.appointmentRepository.findAll();
    return AppointmentDTO.fromEntities(appointments);
  }

  async getAppointmentById(id) {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      return null;
    }
    return AppointmentDTO.fromEntity(appointment);
  }

  async createAppointment(appointmentData) {
    // Validate appointment data
    if (!this.validationService.validateAppointment(appointmentData)) {
      throw new Error('Invalid appointment data');
    }

    // Create appointment entity
    const appointment = new Appointment(
      null,
      appointmentData.date,
      appointmentData.statusId,
      appointmentData.patientName
    );

    // Save to repository
    const savedAppointment = await this.appointmentRepository.create(appointment);
    
    // Convert to DTO
    const appointmentDTO = AppointmentDTO.fromEntity(savedAppointment);
    
    // Emit event
    this.eventBus.emit('appointment.created', appointmentDTO);
    
    return appointmentDTO;
  }

  async updateAppointment(id, appointmentData) {
    // Validate appointment data
    if (!this.validationService.validateAppointment(appointmentData, true)) {
      throw new Error('Invalid appointment data');
    }

    // Get existing appointment
    const existingAppointment = await this.appointmentRepository.findById(id);
    if (!existingAppointment) {
      return null;
    }

    // Check if status is changing to emit the right event
    const oldStatusId = existingAppointment.statusId;
    const newStatusId = appointmentData.statusId || oldStatusId;
    const isStatusChanging = oldStatusId !== newStatusId;

    // Update appointment
    existingAppointment.update(appointmentData);
    
    // Save to repository
    const updatedAppointment = await this.appointmentRepository.update(existingAppointment);
    
    // Convert to DTO
    const appointmentDTO = AppointmentDTO.fromEntity(updatedAppointment);
    
    // Emit events
    this.eventBus.emit('appointment.updated', appointmentDTO);
    
    if (isStatusChanging) {
      this.eventBus.emit('appointment.status.changed', {
        appointment: appointmentDTO,
        oldStatusId,
        newStatusId
      });
    }
    
    return appointmentDTO;
  }

  async deleteAppointment(id) {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      return false;
    }

    await this.appointmentRepository.delete(id);
    
    // Emit event
    this.eventBus.emit('appointment.deleted', { id });
    
    return true;
  }
}

module.exports = AppointmentService;
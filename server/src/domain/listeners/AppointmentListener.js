const EVENT_TYPES = require('../events/config/eventTypes');

class AppointmentListener {
  constructor(eventBus, httpService) {
    this.eventBus = eventBus;
    this.httpService = httpService;
    this.registerListeners();
  }

  registerListeners() {
    this.eventBus.subscribe(
      EVENT_TYPES.APPOINTMENT.CREATED,
      this.handleAppointmentCreated.bind(this)
    );
    
    this.eventBus.subscribe(
      EVENT_TYPES.APPOINTMENT.UPDATED,
      this.handleAppointmentUpdated.bind(this)
    );
    
    this.eventBus.subscribe(
      EVENT_TYPES.APPOINTMENT.DELETED,
      this.handleAppointmentDeleted.bind(this)
    );
    
    this.eventBus.subscribe(
      EVENT_TYPES.APPOINTMENT.STATUS_CHANGED,
      this.handleAppointmentStatusChanged.bind(this)
    );
  }

  async handleAppointmentCreated(appointmentDTO) {
    console.log('Appointment created:', appointmentDTO);
    // Additional logic like sending notifications, logging, etc.
    try {
      // Example: Send notification to an external service
      await this.httpService.post('/notifications/appointment/created', {
        appointment: appointmentDTO
      });
    } catch (error) {
      console.error('Error sending appointment created notification:', error);
    }
  }

  async handleAppointmentUpdated(appointmentDTO) {
    console.log('Appointment updated:', appointmentDTO);
    // Additional logic
  }

  async handleAppointmentDeleted(data) {
    console.log('Appointment deleted:', data.id);
    // Additional logic
  }

  async handleAppointmentStatusChanged(data) {
    console.log(
      `Appointment ${data.appointment.id} status changed from ${data.oldStatusId} to ${data.newStatusId}`
    );
    
    // Additional logic like triggering workflows based on status changes
    try {
      await this.httpService.post('/notifications/appointment/status-changed', {
        appointmentId: data.appointment.id,
        oldStatusId: data.oldStatusId,
        newStatusId: data.newStatusId
      });
    } catch (error) {
      console.error('Error sending status change notification:', error);
    }
  }
}

module.exports = AppointmentListener;
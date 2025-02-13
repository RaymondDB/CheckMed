class AppointmentScheduledEvent {
    constructor(appointment) {
        this.appointment = appointment;
        this.eventDate = new Date();
    }
}

module.exports = AppointmentScheduledEvent;

const AppointmentError = require('./AppointmentError');
const StatusError = require('./StatusError');
const Appointment = require('./Appointment'); // Asegúrate de tener acceso al Appointment
const Status = require('./Status'); // Asegúrate de tener acceso al Status

class SendNotificationListener {

  async onAppointmentRequested(appointment) {
    try {
      if (!(appointment instanceof Appointment)) {
        throw new Error('Invalid appointment data');
      }

      // Verificamos si el doctor está disponible para la cita
      const doctorIsAvailable = false; // Aquí debería ir la lógica real para verificar la disponibilidad
      if (!doctorIsAvailable) {
        throw AppointmentError.doctorUnavailable();
      }

      // Verificamos si la fecha de la cita es válida (no pasada)
      const currentDate = new Date();
      if (appointment.appointmentDate < currentDate) {
        throw AppointmentError.pastDate();
      }

      // Si todo está bien, procederemos a notificar
      console.log(`Sending appointment notification for appointment ID: ${appointment.appointmentID}`);
    } catch (error) {
      if (error instanceof AppointmentError) {
        console.error(`Appointment error: ${error.message}`);
      } else {
        console.error(`Unknown error: ${error.message}`);
      }
    }
  }

  async onStatusChanged(status) {
    try {
      if (!(status instanceof Status)) {
        throw new Error('Invalid status data');
      }

      // Verificamos si el estado existe
      const statusExists = true; // Aquí debería ir la lógica real para verificar si el estado existe
      if (!statusExists) {
        throw StatusError.statusNotFound();
      }

      // Si todo está bien, notificar el cambio de estado
      console.log(`Sending status change notification for status ID: ${status.statusID}`);
    } catch (error) {
      if (error instanceof StatusError) {
        console.error(`Status error: ${error.message}`);
      } else {
        console.error(`Unknown error: ${error.message}`);
      }
    }
  }
}

module.exports = new SendNotificationListener();

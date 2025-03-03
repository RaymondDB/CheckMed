const { eventBus } = require('../events/config');
const AppointmentListener = require('./AppointmentListener');
const StatusListener = require('./StatusListener');

eventBus.on('appointmentCreated', AppointmentListener.onAppointmentCreated);
eventBus.on('appointmentUpdated', AppointmentListener.onAppointmentUpdated);
eventBus.on('statusUpdated', StatusListener.onStatusUpdated);

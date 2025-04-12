const EVENT_TYPES = {
    APPOINTMENT: {
      CREATED: 'appointment.created',
      UPDATED: 'appointment.updated',
      DELETED: 'appointment.deleted',
      STATUS_CHANGED: 'appointment.status.changed'
    },
    STATUS: {
      CREATED: 'status.created',
      UPDATED: 'status.updated',
      DELETED: 'status.deleted'
    }
  };
  
  module.exports = EVENT_TYPES;
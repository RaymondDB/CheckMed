const EVENT_TYPES = require('./config/eventTypes');

class StatusEvents {
  static created(statusDTO) {
    return {
      type: EVENT_TYPES.STATUS.CREATED,
      payload: statusDTO,
      timestamp: new Date()
    };
  }

  static updated(statusDTO) {
    return {
      type: EVENT_TYPES.STATUS.UPDATED,
      payload: statusDTO,
      timestamp: new Date()
    };
  }

  static deleted(statusId) {
    return {
      type: EVENT_TYPES.STATUS.DELETED,
      payload: { id: statusId },
      timestamp: new Date()
    };
  }
}

module.exports = StatusEvents;
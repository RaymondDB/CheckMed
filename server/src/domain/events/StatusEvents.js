const { eventBus } = require('./config');

class StatusEvents {
  static statusUpdated(status) {
    eventBus.emit('statusUpdated', status);
  }
}

module.exports = StatusEvents;

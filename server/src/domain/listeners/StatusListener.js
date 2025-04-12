const EVENT_TYPES = require('../events/config/eventTypes');

class StatusListener {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.registerListeners();
  }

  registerListeners() {
    this.eventBus.subscribe(
      EVENT_TYPES.STATUS.CREATED,
      this.handleStatusCreated.bind(this)
    );
    
    this.eventBus.subscribe(
      EVENT_TYPES.STATUS.UPDATED,
      this.handleStatusUpdated.bind(this)
    );
    
    this.eventBus.subscribe(
      EVENT_TYPES.STATUS.DELETED,
      this.handleStatusDeleted.bind(this)
    );
  }

  async handleStatusCreated(statusDTO) {
    console.log('Status created:', statusDTO);
    // Additional logic
  }

  async handleStatusUpdated(statusDTO) {
    console.log('Status updated:', statusDTO);
    // Additional logic
  }

  async handleStatusDeleted(data) {
    console.log('Status deleted:', data.id);
    // Additional logic
  }
}

module.exports = StatusListener;
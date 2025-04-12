class EventBus {
    constructor() {
      this.listeners = {};
    }
  
    subscribe(eventType, callback) {
      if (!this.listeners[eventType]) {
        this.listeners[eventType] = [];
      }
      this.listeners[eventType].push(callback);
      
      // Return unsubscribe function
      return () => {
        this.listeners[eventType] = this.listeners[eventType].filter(
          cb => cb !== callback
        );
      };
    }
  
    emit(eventType, payload) {
      if (this.listeners[eventType]) {
        this.listeners[eventType].forEach(callback => {
          try {
            callback(payload);
          } catch (error) {
            console.error(`Error in event listener for ${eventType}:`, error);
          }
        });
      }
    }
  
    removeAllListeners(eventType) {
      if (eventType) {
        delete this.listeners[eventType];
      } else {
        this.listeners = {};
      }
    }
  }
  
  module.exports = EventBus;
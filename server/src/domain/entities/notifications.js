const NotificationMessage = require("../valueObjects/NotificationMessage");

class Notifications {
  constructor(notificationsId, userId, message, sentAt) {
    this.notificationsId = notificationsId;
    this.userId = userId;
    this.message = new NotificationMessage(message); // Validar mensaje
    this.sentAt = sentAt || new Date(); // Si no hay fecha, se asigna la actual
  }

  updateMessage(newMessage) {
    this.message = new NotificationMessage(newMessage); // Validar nuevo mensaje
  }
}

module.exports = Notifications;

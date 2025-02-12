class notifications {
  constructor(notificationsId, userId, message, setAt) {
    this.notificationsId = notificationsId;
    this.userId = userId;
    this.message = message;
    this.setAt = setAt;
  }
}

module.exports = notifications;

//Aun no implementado

module.exports = function NotificationCreated(notification) {
  return {
    type: "NOTIFICATION_CREATED",
    payload: {
      NotificationID: notification.id,
      UserID: notification.userId,
      Message: notification.message,
      SentAt: notification.sentAt || new Date(),
    },
    timestamp: new Date(),
  };
};

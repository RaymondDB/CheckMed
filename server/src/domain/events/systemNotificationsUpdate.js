//Aun no implementado

module.exports = function NotificationUpdated(notification) {
  return {
    type: "NOTIFICATION_UPDATED",
    payload: {
      NotificationID: notification.id,
      UserID: notification.userId,
      Message: notification.message,
      SentAt: notification.sentAt || new Date(),
    },
    timestamp: new Date(),
  };
};

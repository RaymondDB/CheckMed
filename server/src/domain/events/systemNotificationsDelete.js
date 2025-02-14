//Aun no implementado

module.exports = function NotificationDeleted(notificationId) {
  return {
    type: "NOTIFICATION_DELETED",
    payload: {
      NotificationID: notificationId,
    },
    timestamp: new Date(),
  };
};

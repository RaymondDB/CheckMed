const eventBus = require("../../infrastructure/eventBus");

eventBus.on("NOTIFICATION_DELETED", (event) => {
  console.log(`🗑️ Notificación Eliminada:
  - ID: ${event.payload.NotificationID}
  - Timestamp: ${event.timestamp}`);
});

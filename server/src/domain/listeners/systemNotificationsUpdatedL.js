const eventBus = require("../../infrastructure/eventBus");

eventBus.on("NOTIFICATION_UPDATED", (event) => {
  console.log(`🔄 Notificación Actualizada:
  - ID: ${event.payload.NotificationID}
  - Usuario ID: ${event.payload.UserID}
  - Nuevo Mensaje: ${event.payload.Message}
  - Fecha de Envío: ${event.payload.SentAt || "No especificado"}
  - Timestamp: ${event.timestamp}`);
});

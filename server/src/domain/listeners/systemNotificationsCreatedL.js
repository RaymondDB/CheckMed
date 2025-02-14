const eventBus = require("../../infrastructure/eventBus");

eventBus.on("NOTIFICATION_CREATED", (event) => {
  console.log(`📢 Nueva Notificación:
  - ID: ${event.payload.NotificationID}
  - Usuario ID: ${event.payload.UserID}
  - Mensaje: ${event.payload.Message}
  - Enviada el: ${event.payload.SentAt || "No especificado"}
  - Timestamp: ${event.timestamp}`);
});

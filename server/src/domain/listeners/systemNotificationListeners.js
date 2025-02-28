const EventBus = require("../../infrastructure/eventBus/EventBus");

EventBus.on("NotificationCreated", async (notification) => {
  console.log(
    `📢 Nueva notificación creada para el usuario ID ${notification.userId}: "${notification.message}"`
  );
  // Aquí puedes agregar lógica para enviar notificaciones en tiempo real o registrar logs
});

EventBus.on("NotificationFetched", async (notification) => {
  console.log(`🔍 Notificación consultada: ID ${notification.notificationId}`);
  // Aquí puedes agregar lógica para auditoría
});

EventBus.on("NotificationDeleted", async ({ notificationId }) => {
  console.log(`🗑️ Notificación eliminada: ID ${notificationId}`);
  // Aquí puedes agregar lógica para limpieza de registros o notificación de eliminación
});

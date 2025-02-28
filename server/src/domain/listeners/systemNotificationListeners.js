const EventBus = require("../../infrastructure/eventBus/EventBus");

EventBus.on("NotificationCreated", async (notification) => {
  console.log(
    `📢 Nueva notificación creada para el usuario ID ${notification.userId}: "${notification.message}"`
  );
});

EventBus.on("NotificationFetched", async (notification) => {
  console.log(`🔍 Notificación consultada: ID ${notification.notificationId}`);
});

EventBus.on("NotificationDeleted", async ({ notificationId }) => {
  console.log(`🗑️ Notificación eliminada: ID ${notificationId}`);
});

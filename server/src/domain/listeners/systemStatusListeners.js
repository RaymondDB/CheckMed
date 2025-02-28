const EventBus = require("../../infrastructure/eventBus/EventBus");

EventBus.on("StatusCreated", async (status) => {
  console.log(`🆕 Nuevo estado creado: ${status.statusName}`);
});

EventBus.on("StatusFetched", async (status) => {
  console.log(`🔍 Estado consultado: ID ${status.statusId}`);
});

EventBus.on("StatusUpdated", async (status) => {
  console.log(`✏️ Estado actualizado: ID ${status.statusId}`);
});

EventBus.on("StatusDeleted", async ({ statusId }) => {
  console.log(`⚠️ Estado eliminado: ID ${statusId}`);
});

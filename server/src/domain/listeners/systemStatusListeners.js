const EventBus = require("../../infrastructure/eventBus/EventBus");

EventBus.on("StatusCreated", async (status) => {
  console.log(`🆕 Nuevo estado creado: ${status.statusName}`);
  // Aquí puedes agregar lógica para registrar en logs o activar procesos
});

EventBus.on("StatusFetched", async (status) => {
  console.log(`🔍 Estado consultado: ID ${status.statusId}`);
  // Aquí puedes agregar lógica para auditoría de estados
});

EventBus.on("StatusUpdated", async (status) => {
  console.log(`✏️ Estado actualizado: ID ${status.statusId}`);
  // Aquí puedes registrar cambios en logs o sistemas dependientes
});

EventBus.on("StatusDeleted", async ({ statusId }) => {
  console.log(`⚠️ Estado eliminado: ID ${statusId}`);
  // Aquí puedes agregar lógica para actualizar dependencias o registros
});

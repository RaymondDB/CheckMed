const eventBus = require("../../infrastructure/eventBus");

eventBus.on("STATUS_UPDATED", (event) => {
  console.log(`🔄 Status Actualizado:
  - ID: ${event.payload.StatusID}
  - Nuevo Nombre: ${event.payload.StatusName}
  - Timestamp: ${event.timestamp}`);
});

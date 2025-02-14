const eventBus = require("../../infrastructure/eventBus");

eventBus.on("STATUS_DELETED", (event) => {
  console.log(`🗑️ Status Eliminado:
  - ID: ${event.payload.StatusID}
  - Timestamp: ${event.timestamp}`);
});

const eventBus = require("../../infrastructure/eventBus");

eventBus.on("STATUS_CREATED", (event) => {
  console.log(`✅ Nuevo Status Creado:
  - ID: ${event.payload.StatusID}
  - Nombre: ${event.payload.StatusName}
  - Timestamp: ${event.timestamp}`);
});

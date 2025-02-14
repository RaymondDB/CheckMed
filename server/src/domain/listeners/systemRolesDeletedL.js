const eventBus = require("../../infrastructure/eventBus");

eventBus.on("ROLE_DELETED", (event) => {
  console.log(`🗑️ Rol Eliminado:
  - ID: ${event.payload.RoleID}
  - Timestamp: ${event.timestamp}`);
});

const eventBus = require("../../infrastructure/eventBus");

eventBus.on("ROLE_UPDATED", (event) => {
  console.log(`🔄 Rol Actualizado:
  - ID: ${event.payload.RoleID}
  - Nuevo Nombre: ${event.payload.RoleName}
  - Última Actualización: ${event.payload.UpdatedAt}
  - Estado: ${event.payload.IsActive ? "Activo" : "Inactivo"}
  - Timestamp: ${event.timestamp}`);
});

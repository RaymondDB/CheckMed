const eventBus = require("../../infrastructure/eventBus");

eventBus.on("ROLE_CREATED", (event) => {
  console.log(`✅ Nuevo Rol Creado:
  - ID: ${event.payload.RoleID}
  - Nombre: ${event.payload.RoleName}
  - Fecha de Creación: ${event.payload.CreatedAt}
  - Estado: ${event.payload.IsActive ? "Activo" : "Inactivo"}
  - Timestamp: ${event.timestamp}`);
});

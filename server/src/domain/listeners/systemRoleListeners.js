const EventBus = require("../../infrastructure/eventBus/EventBus");

EventBus.on("RoleCreated", async (role) => {
  console.log(`🆕 Nuevo rol creado: ${role.roleName}`);
  // Aquí puedes agregar lógica para asignar permisos o registrar logs
});

EventBus.on("RoleFetched", async (role) => {
  console.log(`🔍 Rol consultado: ID ${role.roleId}`);
  // Aquí puedes agregar lógica para auditoría
});

EventBus.on("RoleUpdated", async (role) => {
  console.log(`✏️ Rol actualizado: ID ${role.roleId}`);
  // Aquí puedes registrar cambios en la base de datos o en logs
});

EventBus.on("RoleDeleted", async ({ roleId }) => {
  console.log(`⚠️ Rol eliminado: ID ${roleId}`);
  // Aquí puedes agregar lógica para notificar cambios en permisos
});

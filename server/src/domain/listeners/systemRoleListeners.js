const EventBus = require("../../infrastructure/eventBus/EventBus");

EventBus.on("RoleCreated", async (role) => {
  console.log(`🆕 Nuevo rol creado: ${role.roleName}`);
});

EventBus.on("RoleFetched", async (role) => {
  console.log(`🔍 Rol consultado: ID ${role.roleId}`);
});

EventBus.on("RoleUpdated", async (role) => {
  console.log(`✏️ Rol actualizado: ID ${role.roleId}`);
});

EventBus.on("RoleDeleted", async ({ roleId }) => {
  console.log(`⚠️ Rol eliminado: ID ${roleId}`);
});

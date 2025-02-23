const EventBus = require("../../infrastructure/eventBus/EventBus");
const OperationResult = require("../../helpers/OperationResult");

EventBus.on("UserCreated", async (user) => {
  console.log(`Usuario creado: ${user.email}`);
  // Aquí podré enviar un email de bienvenida o registrar logs
});

EventBus.on("UserFetched", async (patient) => {
  console.log(`Paciente consultado: ID ${patient.id}`);
  // Aquí podré agregar lógica para registrar auditoría
});

EventBus.on("UserDeleted", async ({ userId }) => {
  console.log(`Usuario eliminado: ID ${userId}`);
  // Aquí podré notificar a otros servicios o registrar auditoría
});

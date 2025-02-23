const EventBus = require("../../infrastructure/eventBus/EventBus");

EventBus.on("PatientCreated", async (patient) => {
  console.log(`Paciente registrado: ID ${patient.id}`);
  // Aquí podré agregar lógica para enviar notificaciones o registrar logs
});

EventBus.on("PatientFetched", async (patient) => {
  console.log(`Paciente consultado: ID ${patient.id}`);
  // Aquí podré agregar lógica para registrar auditoría
});

EventBus.on("PatientDeleted", async ({ patientId }) => {
  console.log(`Paciente eliminado: ID ${patientId}`);
  // Aquí podré agregar lógica para notificar a otros sistemas
});

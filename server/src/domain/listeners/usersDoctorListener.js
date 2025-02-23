const EventBus = require("../../infrastructure/eventBus/EventBus");

EventBus.on("DoctorCreated", async (doctor) => {
  console.log(`✅ Doctor registrado: ${doctor.licenseNumber}`);
  // Aquí agregare lógica para enviar notificaciones o registrar logs
});

EventBus.on("DoctorFetched", async (doctor) => {
  console.log(`🔍 Doctor consultado: ID ${doctor.id}`);
  // Aquí agregare lógica para auditoría
});

EventBus.on("DoctorUpdated", async (doctor) => {
  console.log(`✏️ Doctor actualizado: ID ${doctor.id}`);
  // Aquí registrare cambios en el sistema
});

EventBus.on("DoctorDeleted", async ({ doctorId }) => {
  console.log(`⚠️ Doctor desactivado: ID ${doctorId}`);
  // Aquí agregare lógica para notificar a otros sistemas
});

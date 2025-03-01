const eventBus = require('./eventBus');


EventBus.on("InsuranceProviderCreated", async (insuranceProvider) => {
  console.log(`✅ Proveedor de seguros creado: Nombre: ${insuranceProvider.name}`);
});

EventBus.on("InsuranceProviderCreated", async (insuranceProvider) => {
  console.log(`🔍 Proveedor de seguros consultado: ID ${insuranceProvider.id}`);
});

EventBus.on("InsuranceProviderCreated", async (insuranceProvider) => {
  console.log(`✏️ Proveedor de seguros actualizado: ID ${insuranceProvider.id}`);
});

EventBus.on("InsuranceProviderCreated", async ({ insuranceProvider }) => {
  console.log(`⚠️ Proveedor de seguros desactivado: ID ${insuranceProvider.Id}`);
});
const eventBus = require('./eventBus');


EventBus.on("InsuranceNetworkTypeCreated", async (insuranceNetworkType) => {
  console.log(`✅ Tipo de red de seguros registrada: Nombre: ${insuranceNetworkType.name}`);
});

EventBus.on("InsuranceNetworkTypeFetched", async (insuranceNetworkType) => {
  console.log(`🔍 Tipo de red de seguros consultada: ID ${insuranceNetworkType.id}`);
});

EventBus.on("InsuranceNetworkTypeUpdated", async (insuranceNetworkType) => {
  console.log(`✏️ Tipo de red de seguros actualizada: ID ${insuranceNetworkType.id}`);
});

EventBus.on("InsuranceNetworkTypeDeleted", async ({ insuranceNetworkType }) => {
  console.log(`⚠️ Tipo de red de seguros desactivada: ID ${insuranceNetworkType.Id}`);
});
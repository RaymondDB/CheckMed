const eventBus = require('../../infrastructure/eventBus');

eventBus.on('INSURANCE_PROVIDER_DELETED', (event) => {
  console.log(`Proveedor de seguros eliminado con ID: ${event.payload.id} en ${event.timestamp}`);
});
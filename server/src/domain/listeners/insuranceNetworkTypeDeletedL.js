const eventBus = require('./eventBus');

eventBus.on('INSURANCE_NETWORK_TYPE_DELETED', (event) => {
  console.log(`Tipo de red de proveedor de seguros eliminada con ID: ${event.payload.id} en ${event.timestamp}`);
});
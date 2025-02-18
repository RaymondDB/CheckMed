const eventBus = require('./eventBus');

eventBus.on('INSURANCE_NETWORK_TYPE_CREATED', (event) => {
  console.log(`Tipo de red de proveedor de seguros creada: ${event.payload.name} en ${event.timestamp}`);
});
const eventBus = require('./eventBus');

eventBus.on('INSURANCE_NETWORK_TYPE_UPDATED', (event) => {
  console.log(`Tipo de red de proveedor de seguros actualizada con ID: ${event.payload.id} en ${event.timestamp}`);
  console.log('Campos actualizados:', event.payload.updatedFields);
});
const eventBus = require('../../infrastructure/eventBus');

eventBus.on('INSURANCE_PROVIDER_UPDATED', (event) => {
  console.log(`Proveedor de seguros actualizado con ID: ${event.payload.id} en ${event.timestamp}`);
  console.log('Campos actualizados:', event.payload.updatedFields);
});
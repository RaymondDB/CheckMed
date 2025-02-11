const eventBus = require('../../infrastructure/eventBus');

eventBus.on('USER_UPDATED', (event) => {
  console.log(`Usuario actualizado con ID: ${event.payload.id} en ${event.timestamp}`);
  console.log('Campos actualizados:', event.payload.updatedFields);
});
const eventBus = require('../../infrastructure/eventBus');

eventBus.on('USER_DELETED', (event) => {
  console.log(`Usuario eliminado con ID: ${event.payload.id} en ${event.timestamp}`);
});
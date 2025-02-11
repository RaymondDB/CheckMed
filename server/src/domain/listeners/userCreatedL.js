const eventBus = require('../../infrastructure/eventBus');

eventBus.on('USER_CREATED', (event) => {
  console.log(`Usuario creado: ${event.payload.name} (${event.payload.email}) en ${event.timestamp}`);
});
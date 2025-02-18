const eventBus = require('./eventBus');

eventBus.on('INSURANCE_PROVIDER_CREATED', (event) => {
  console.log(`Proveedor de seguros creado: ${event.payload.name} (${event.payload.email}) en ${event.timestamp}`);
});
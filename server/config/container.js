const { createContainer, asClass } = require("awilix");

// Importamos los servicios de negocio
const InsuranceNetworkTypeService = require("../src/business/services");
const InsuranceProvidersService = require("../src/business/services");

// Importamos los repositorios
const InsuranceNetworkTypeImplementation = require("../src/repositories/implementations/InsuranceNetworkTypeImplementation");
const InsuranceProvidersImplementation = require("../src/repositories/implementations/InsuranceProvidersImplementation");


// Creamos el contenedor IoC
const container = createContainer();

container.register({
  // Servicios de negocio
  insuranceNetworkTypeService: asClass(InsuranceNetworkTypeService).singleton(),
  insuranceProvidersService: asClass(InsuranceProvidersService).singleton(),

  // Repositorios de persistencia
  insuranceNetworkTypeRepository: asClass(InsuranceNetworkTypeImplementation).singleton(),
  insuranceProvidersRepository: asClass(InsuranceProvidersImplementation).singleton(),
});

module.exports = container;
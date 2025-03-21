const { createContainer, asClass } = require("awilix");

const InsuranceNetworkTypeService = require("../src/business/services");
const InsuranceProvidersService = require("../src/business/services");


const InsuranceNetworkTypeImplementation = require("../src/repositories/implementations/InsuranceNetworkTypeImplementation");
const InsuranceProvidersImplementation = require("../src/repositories/implementations/InsuranceProvidersImplementation");


const container = createContainer();

container.register({
  insuranceNetworkTypeService: asClass(InsuranceNetworkTypeService).singleton(),
  insuranceProvidersService: asClass(InsuranceProvidersService).singleton(),

  insuranceNetworkTypeRepository: asClass(InsuranceNetworkTypeImplementation).singleton(),
  insuranceProvidersRepository: asClass(InsuranceProvidersImplementation).singleton(),
});

module.exports = container;
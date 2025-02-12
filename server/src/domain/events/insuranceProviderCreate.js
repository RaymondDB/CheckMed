//Aun no implementado

module.exports = function InsuranceProviderCreated(insuranceProvider) {
    return {
      type: 'INSURANCE_PROVIDER_CREATED',
      payload: {
        id: insuranceProvider.id,
        email: insuranceProvider.email.address,
        name: `${insuranceProvider.name}`
      },
      timestamp: new Date()
    };
  };
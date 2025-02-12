//Aun no implementado

module.exports = function InsuranceProviderUpdated(insuranceProvider) {
    return {
      type: 'INSURANCE_PROVIDER_UPDATED',
      payload: {
        id: insuranceProvider.id,
        updatedFields: {
          name: insuranceProvider.name,
          email: insuranceProvider.email.address
        }
      },
      timestamp: new Date()
    };
  };
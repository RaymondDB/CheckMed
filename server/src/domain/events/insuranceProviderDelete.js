//Aun no implementado

module.exports = function InsuranceProviderDeleted(insuranceProviderId) {
    return {
      type: 'INSURANCE_PROVIDER_DELETED',
      payload: {
        id: insuranceProvider.id
      },
      timestamp: new Date()
    };
  };
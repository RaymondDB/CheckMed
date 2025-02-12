//Aun no implementado

module.exports = function InsuranceNetworkTypeCreated(insuranceNetworkType) {
    return {
      type: 'INSURANCE_NETWORK_TYPE_CREATED',
      payload: {
        id: insuranceNetworkType.id,
        name: `${insuranceNetworkType.name}`
      },
      timestamp: new Date()
    };
  };
//Aun no implementado

module.exports = function InsuranceNetworkTypeUpdated(insuranceNetworkType) {
    return {
      type: 'INSURANCE_NETWORK_TYPE_UPDATED',
      payload: {
        id: insuranceNetworkType.id,
        updatedFields: {
          name: insuranceNetworkType.name,
        }
      },
      timestamp: new Date()
    };
  };
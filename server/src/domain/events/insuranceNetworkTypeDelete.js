//Aun no implementado

module.exports = function InsuranceNetworkTypeDeleted(insuranceNetworkTypeId) {
    return {
      type: 'INSURANCE_NETWORK_TYPE_DELETED',
      payload: {
        id: insuranceNetworkType.id
      },
      timestamp: new Date()
    };
  };
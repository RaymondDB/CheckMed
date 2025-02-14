//Aun no implementado

module.exports = function StatusUpdated(status) {
  return {
    type: "STATUS_UPDATED",
    payload: {
      StatusID: status.id,
      StatusName: status.name,
    },
    timestamp: new Date(),
  };
};

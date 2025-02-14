//Aun no implementado
module.exports = function StatusDeleted(statusId) {
  return {
    type: "STATUS_DELETED",
    payload: {
      StatusID: statusId,
    },
    timestamp: new Date(),
  };
};

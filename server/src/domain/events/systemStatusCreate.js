//Aun no implementado

module.exports = function StatusCreated(status) {
  return {
    type: "STATUS_CREATED",
    payload: {
      StatusID: status.id,
      StatusName: status.name,
    },
    timestamp: new Date(),
  };
};

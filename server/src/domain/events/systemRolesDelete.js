//Aun no implementado

module.exports = function RoleDeleted(roleId) {
  return {
    type: "ROLE_DELETED",
    payload: {
      RoleID: roleId,
    },
    timestamp: new Date(),
  };
};

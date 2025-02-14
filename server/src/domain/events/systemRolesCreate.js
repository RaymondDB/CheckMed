//Aun no implementado

module.exports = function RoleCreated(role) {
  return {
    type: "ROLE_CREATED",
    payload: {
      RoleID: role.id,
      RoleName: role.name,
      CreatedAt: role.createdAt || new Date(),
      IsActive: role.isActive,
    },
    timestamp: new Date(),
  };
};

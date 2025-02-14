//Aun no implementado

module.exports = function RoleUpdated(role) {
  return {
    type: "ROLE_UPDATED",
    payload: {
      RoleID: role.id,
      RoleName: role.name,
      UpdatedAt: role.updatedAt || new Date(),
      IsActive: role.isActive,
    },
    timestamp: new Date(),
  };
};

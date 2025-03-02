module.exports = {
  /**
   * Verifica si el ID del rol es válido.
   * @param {number} roleID
   * @returns {boolean}
   */
  isValidRoleID: (roleID) => {
    return Number.isInteger(roleID) && roleID > 0;
  },

  /**
   * Verifica si el nombre del rol es válido (entre 3 y 50 caracteres).
   * @param {string} roleName
   * @returns {boolean}
   */
  isValidRoleName: (roleName) => {
    return (
      typeof roleName === "string" &&
      roleName.trim().length >= 3 &&
      roleName.trim().length <= 50
    );
  },

  /**
   * Verifica si la fecha de creación es válida.
   * @param {Date} createdAt
   * @returns {boolean}
   */
  isValidCreatedAt: (createdAt) => {
    return createdAt instanceof Date && !isNaN(createdAt.getTime());
  },

  /**
   * Verifica si la fecha de actualización es válida.
   * @param {Date} updatedAt
   * @returns {boolean}
   */
  isValidUpdatedAt: (updatedAt) => {
    return updatedAt instanceof Date && !isNaN(updatedAt.getTime());
  },

  /**
   * Verifica si el estado de activación es válido (debe ser booleano).
   * @param {boolean} isActive
   * @returns {boolean}
   */
  isValidIsActive: (isActive) => {
    return typeof isActive === "boolean";
  },
};

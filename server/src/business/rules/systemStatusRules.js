module.exports = {
  /**
   * Verifica si el ID del estado es válido.
   * @param {number} statusID
   * @returns {boolean}
   */
  isValidStatusID: (statusID) => {
    return Number.isInteger(statusID) && statusID > 0;
  },

  /**
   * Verifica si el nombre del estado es válido (entre 3 y 50 caracteres).
   * @param {string} statusName
   * @returns {boolean}
   */
  isValidStatusName: (statusName) => {
    return (
      typeof statusName === "string" &&
      statusName.trim().length >= 3 &&
      statusName.trim().length <= 50
    );
  },
};

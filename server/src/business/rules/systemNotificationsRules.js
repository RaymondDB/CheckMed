module.exports = {
  /**
   * Verifica si el ID de la notificación es válido.
   * @param {number} notificationID
   * @returns {boolean}
   */
  isValidNotificationID: (notificationID) => {
    return Number.isInteger(notificationID) && notificationID > 0;
  },

  /**
   * Verifica si el ID del usuario es válido.
   * @param {number} userID
   * @returns {boolean}
   */
  isValidUserID: (userID) => {
    return Number.isInteger(userID) && userID > 0;
  },

  /**
   * Verifica si el mensaje de la notificación es válido (no vacío y con una longitud máxima).
   * @param {string} message
   * @returns {boolean}
   */
  isValidMessage: (message) => {
    return (
      typeof message === "string" &&
      message.trim().length > 0 &&
      message.length <= 1000
    );
  },

  /**
   * Verifica si la fecha de envío de la notificación es válida.
   * @param {Date} sentAt
   * @returns {boolean}
   */
  isValidSentAt: (sentAt) => {
    return sentAt instanceof Date && !isNaN(sentAt.getTime());
  },
};

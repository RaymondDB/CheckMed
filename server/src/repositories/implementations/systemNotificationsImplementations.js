const OperationResult = require("../../helpers/OperationResult");
const { sequelize } = require("../../infrastructure/db/dbconfig");
const { QueryTypes } = require("sequelize");
const moment = require("moment");

class NotificationsImplementation {
  async findById(NotificationID) {
    try {
      console.log("🔍 Buscando notificación con ID:", NotificationID);

      const notification = await sequelize.query(
        `SELECT * FROM system.Notifications WHERE notificationId = :NotificationID`,
        { replacements: { NotificationID }, type: QueryTypes.SELECT }
      );

      if (!notification.length)
        return OperationResult.failure("Notificación no encontrada.");

      return OperationResult.success(notification[0]);
    } catch (error) {
      return OperationResult.failure(
        "Error en la búsqueda de la notificación.",
        error
      );
    }
  }

  async findAll() {
    try {
      console.log("📄 Buscando todas las notificaciones...");

      const notifications = await sequelize.query(
        `SELECT * FROM system.Notifications`,
        { type: QueryTypes.SELECT }
      );

      return OperationResult.success(notifications);
    } catch (error) {
      return OperationResult.failure(
        "Error al obtener la lista de notificaciones.",
        error
      );
    }
  }

  async save(notificationData) {
    try {
      console.log("💾 Guardando notificación en BD:", notificationData);

      const sentAt = moment().format("YYYY-MM-DD HH:mm:ss");

      const result = await sequelize.query(
        `INSERT INTO system.Notifications (userId, message, sentAt)
         VALUES (:UserID, :Message, :SentAt)`,
        {
          replacements: {
            UserID: notificationData.UserID,
            Message: notificationData.Message,
            SentAt: sentAt,
          },
          type: QueryTypes.INSERT,
        }
      );

      return OperationResult.success({
        message: "Notificación guardada correctamente",
        result,
      });
    } catch (error) {
      return OperationResult.failure(
        "Error al guardar la notificación.",
        error
      );
    }
  }

  async delete(NotificationID) {
    try {
      console.log("Eliminando notificación con ID:", NotificationID);

      const result = await sequelize.query(
        `DELETE FROM system.Notifications WHERE notificationId = :NotificationID`,
        { replacements: { NotificationID }, type: QueryTypes.DELETE }
      );

      if (result === 0) {
        return OperationResult.failure("Notificación no encontrada.");
      }

      return OperationResult.success("Notificación eliminada correctamente.");
    } catch (error) {
      return OperationResult.failure(
        "Error al eliminar la notificación.",
        error
      );
    }
  }
}

module.exports = new NotificationsImplementation();

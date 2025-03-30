const OperationResult = require("../../helpers/OperationResult");
const Notification = require("../../infrastructure/Models/NotificationsModel");
const moment = require("moment");

const now = moment().format("YYYY-MM-DD HH:mm:ss");

class NotificationsImplementation {
  async findById(notificationId) {
    try {
      const notification = await Notification.findByPk(notificationId);

      if (!notification)
        return OperationResult.failure("Notificación no encontrada.");

      return OperationResult.success(notification);
    } catch (error) {
      return OperationResult.failure(
        "Error en la búsqueda de la notificación.",
        error
      );
    }
  }

  async findAll() {
    try {
      const notifications = await Notification.findAll();

      return OperationResult.success(notifications);
    } catch (error) {
      return OperationResult.failure(
        "Error al obtener la lista de notificaciones.",
        error
      );
    }
  }

  async save(notificationData, transaction) {
    try {
      const notification = await Notification.create(
        {
          userId: notificationData.UserID,
          message: notificationData.Message,
          sentAt: now,
          createdAt: now,
          updatedAt: now,
        },
        { transaction }
      );

      return OperationResult.success({
        message: "Notificación guardada correctamente",
        id: notification.notificationId,
      });
    } catch (error) {
      return OperationResult.failure(
        "Error al guardar la notificación.",
        error
      );
    }
  }

  async update(notificationId, updatedFields) {
    try {
      const notification = await Notification.findByPk(notificationId);

      if (!notification)
        return OperationResult.failure("Notificación no encontrada.");

      await notification.update({
        ...updatedFields,
        updatedAt: new Date(),
      });

      return OperationResult.success("Notificación actualizada correctamente.");
    } catch (error) {
      return OperationResult.failure(
        "Error al actualizar la notificación.",
        error
      );
    }
  }

  async delete(notificationId) {
    try {
      const notification = await Notification.findByPk(notificationId);

      if (!notification)
        return OperationResult.failure("Notificación no encontrada.");

      await notification.destroy();

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

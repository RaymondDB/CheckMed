const NotificationRepository = require("../../repositories/implementations/systemNotificationsImplementations");
const EventBus = require("../listeners/eventBus");
const OperationResult = require("../../helpers/OperationResult");
const ValidationService = require("./validationService");

class NotificationService {
  async createNotification(notificationData) {
    console.log("📩 Datos de notificación recibidos:", notificationData);

    if (!notificationData || typeof notificationData !== "object") {
      console.error(
        "❌ Error: notificationData no es un objeto válido:",
        notificationData
      );
      return OperationResult.failure("Formato de datos incorrecto.");
    }

    const { NotificationID, UserID, Message, SentAt } = notificationData;

    console.log("📌 Campos extraídos:");
    console.log("NotificationID:", NotificationID);
    console.log("UserID:", UserID);
    console.log("Message:", Message);
    console.log("SentAt:", SentAt);

    // **Validaciones obligatorias**
    if (!UserID || !Message) {
      console.error(
        "❌ Error: Faltan campos obligatorios en notificationData."
      );
      return OperationResult.failure(
        "Todos los campos obligatorios deben completarse."
      );
    }

    if (!ValidationService.isValidNotificationMessage(Message)) {
      console.error("❌ Error: El mensaje de la notificación no es válido.");
      return OperationResult.failure(
        "El mensaje no puede estar vacío y debe tener un máximo de 255 caracteres."
      );
    }

    console.log("💾 Guardando notificación en BD...");
    const notificationToSave = {
      NotificationID,
      UserID,
      Message,
      SentAt: SentAt || new Date(), // Si no se proporciona, se usa la fecha actual
    };

    const notificationResult = await NotificationRepository.save(
      notificationToSave
    );

    if (notificationResult.success) {
      console.log(
        "✅ Notificación guardada con éxito:",
        notificationResult.data
      );
      EventBus.emit("NotificationCreated", notificationResult.data);
    } else {
      console.error(
        "❌ Error al guardar la notificación:",
        notificationResult.error
      );
    }

    return notificationResult;
  }

  async getNotificationById(NotificationID) {
    console.log("🔍 Buscando notificación con ID:", NotificationID);

    if (!ValidationService.isValidId(NotificationID)) {
      console.error("❌ Error: ID de notificación inválido.");
      return OperationResult.failure(
        "El ID de la notificación debe ser un número válido."
      );
    }

    const notification = await NotificationRepository.findById(NotificationID);
    if (!notification.success) {
      console.error("❌ Notificación no encontrada.");
      return OperationResult.failure("Notificación no encontrada.");
    }

    EventBus.emit("NotificationFetched", notification.data);
    return notification;
  }

  async updateNotification(NotificationID, updatedFields) {
    console.log("🛠️ Buscando notificación con ID:", NotificationID);

    if (!ValidationService.isValidId(NotificationID)) {
      console.error("❌ Error: ID de notificación inválido.");
      return OperationResult.failure(
        "El ID de la notificación debe ser un número válido."
      );
    }

    const notification = await NotificationRepository.findById(NotificationID);
    if (!notification.success) {
      console.error("❌ Notificación no encontrada.");
      return OperationResult.failure("Notificación no encontrada.");
    }

    if (
      updatedFields.Message &&
      !ValidationService.isValidNotificationMessage(updatedFields.Message)
    ) {
      console.error("❌ Error: El mensaje de la notificación no es válido.");
      return OperationResult.failure(
        "El mensaje no puede estar vacío y debe tener un máximo de 255 caracteres."
      );
    }

    console.log(
      "✅ Actualizando notificación con ID:",
      NotificationID,
      "Campos:",
      updatedFields
    );

    updatedFields.SentAt = new Date();

    const updateResult = await NotificationRepository.update(
      NotificationID,
      updatedFields
    );
    if (updateResult.success) {
      EventBus.emit("NotificationUpdated", updateResult.data);
    }

    return updateResult;
  }

  async deleteNotification(NotificationID) {
    console.log("🗑 Buscando notificación con ID:", NotificationID);

    if (!ValidationService.isValidId(NotificationID)) {
      console.error("❌ Error: ID de notificación inválido.");
      return OperationResult.failure(
        "El ID de la notificación debe ser un número válido."
      );
    }

    const notification = await NotificationRepository.findById(NotificationID);
    if (!notification.success) {
      console.error("❌ Notificación no encontrada.");
      return OperationResult.failure("Notificación no encontrada.");
    }

    console.log("🗑 Eliminando notificación con ID:", NotificationID);
    const deleteResult = await NotificationRepository.delete(NotificationID);

    if (deleteResult.success) {
      EventBus.emit("NotificationDeleted", { NotificationID });
    }

    return deleteResult;
  }
}

module.exports = new NotificationService();

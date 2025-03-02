const NotificationDomainService = require("../../domain/services/systemNotificationService");
const NotificationRepository = require("../../repositories/implementations/systemNotificationsImplementation");
const EventBus = require("../listeners/eventBus");
const OperationResult = require("../../helpers/OperationResult");
const ValidationService = require("../rules/notificationsRules");
const { sequelize } = require("../../infrastructure/db");

class NotificationBService {
  constructor({ notificationRepository }) {
    this.notificationRepository = NotificationRepository;
  }

  async createNotification(notificationData) {
    console.log("📩 Datos de notificación recibidos:", notificationData);

    if (!notificationData || typeof notificationData !== "object") {
      console.error(
        "❌ Error: notificationData no es un objeto válido:",
        notificationData
      );
      return OperationResult.failure("Formato de datos incorrecto.");
    }

    // Validación con reglas de negocio
    const validation =
      NotificationDomainService.validateRequiredFields(notificationData);
    if (!validation.success) {
      console.error("❌ Error:", validation.message);
      return OperationResult.failure(validation.message);
    }

    if (!ValidationService.isValidMessage(notificationData.Message)) {
      console.error("❌ Error: Mensaje inválido.");
      return OperationResult.failure(
        "El mensaje de la notificación no es válido."
      );
    }

    console.log("💾 Guardando notificación en BD:", notificationData);
    const notificationToSave = {
      ...notificationData,
      SentAt: new Date(),
    };

    const notificationResult = await this.notificationRepository.save(
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

  async getNotificationById(notificationID) {
    console.log("🔍 Buscando notificación con ID:", notificationID);

    if (!ValidationService.isValidNotificationID(notificationID)) {
      console.error("❌ Error: ID de notificación inválido.");
      return OperationResult.failure(
        "El ID de la notificación debe ser un número válido."
      );
    }

    const notification = await this.notificationRepository.findById(
      notificationID
    );
    if (!notification.success) {
      console.error("❌ Notificación no encontrada.");
      return OperationResult.failure("Notificación no encontrada.");
    }

    EventBus.emit("NotificationFetched", notification.data);
    return notification;
  }

  async deleteNotification(notificationID) {
    console.log("🗑 Buscando notificación con ID:", notificationID);

    if (!ValidationService.isValidNotificationID(notificationID)) {
      console.error("❌ Error: ID de notificación inválido.");
      return OperationResult.failure(
        "El ID de la notificación debe ser un número válido."
      );
    }

    const notification = await this.notificationRepository.findById(
      notificationID
    );
    if (!notification.success) {
      console.error("❌ Notificación no encontrada.");
      return OperationResult.failure("Notificación no encontrada.");
    }

    console.log("Eliminando notificación con ID:", notificationID);
    const deleteResult = await this.notificationRepository.delete(
      notificationID
    );

    if (deleteResult.success) {
      EventBus.emit("NotificationDeleted", { notificationID });
    }

    return deleteResult;
  }
}

module.exports = NotificationBService;

const express = require("express");
const router = express.Router();
const NotificationService = require("../../domain/services/systemNotificationService");

router.post("/", async (req, res) => {
  try {
    console.log("📩 Cuerpo recibido en la API (Notificación):", req.body);

    if (!req.body || typeof req.body !== "object") {
      console.error(
        "❌ Error: Cuerpo de la petición no es un objeto válido",
        req.body
      );
      return res.status(400).json({
        success: false,
        message: "Formato de datos incorrecto.",
        data: null,
        error: null,
      });
    }

    const notificationResult = await NotificationService.createNotification(
      req.body
    );

    if (!notificationResult.success) {
      return res.status(400).json(notificationResult);
    }

    return res.status(201).json(notificationResult);
  } catch (error) {
    console.error("❌ Error inesperado en notificationsRoutes:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor.", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await NotificationService.getNotificationById(req.params.id);
    if (!result.success) return res.status(404).json(result);
    res.json(result);
  } catch (error) {
    console.error("❌ Error en la búsqueda de notificación:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor.", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await NotificationService.deleteNotification(req.params.id);
    if (!result.success) return res.status(404).json(result);
    res.json(result);
  } catch (error) {
    console.error("❌ Error en la eliminación de notificación:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor.", error });
  }
});

module.exports = router;

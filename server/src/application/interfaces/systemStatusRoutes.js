const express = require("express");
const router = express.Router();
const StatusService = require("../../domain/services/systemStatusService");

router.post("/", async (req, res) => {
  try {
    console.log("🆕 Cuerpo recibido en la API (Estado):", req.body);

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

    const statusResult = await StatusService.createStatus(req.body);

    if (!statusResult.success) {
      return res.status(400).json(statusResult);
    }

    return res.status(201).json(statusResult);
  } catch (error) {
    console.error("❌ Error inesperado en systemStatusRoutes:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor.", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await StatusService.getStatusById(req.params.id);
    if (!result.success) return res.status(404).json(result);
    res.json(result);
  } catch (error) {
    console.error("❌ Error en la búsqueda del estado:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor.", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log(
      "✏️ Cuerpo recibido en la API (Actualización de Estado):",
      req.body
    );

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

    const result = await StatusService.updateStatus(req.params.id, req.body);
    if (!result.success) return res.status(400).json(result);
    res.json(result);
  } catch (error) {
    console.error("❌ Error en la actualización del estado:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor.", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await StatusService.deleteStatus(req.params.id);
    if (!result.success) return res.status(404).json(result);
    res.json(result);
  } catch (error) {
    console.error("❌ Error en la eliminación del estado:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor.", error });
  }
});

module.exports = router;

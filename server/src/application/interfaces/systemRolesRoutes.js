const express = require("express");
const router = express.Router();
const RoleService = require("../../domain/services/systemRolesService");

router.post("/", async (req, res) => {
  try {
    console.log("🆕 Cuerpo recibido en la API (Rol):", req.body);

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

    const roleResult = await RoleService.createRole(req.body);

    if (!roleResult.success) {
      return res.status(400).json(roleResult);
    }

    return res.status(201).json(roleResult);
  } catch (error) {
    console.error("❌ Error inesperado en systemRolesRoutes:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor.", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await RoleService.getRoleById(req.params.id);
    if (!result.success) return res.status(404).json(result);
    res.json(result);
  } catch (error) {
    console.error("❌ Error en la búsqueda del rol:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor.", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log(
      "✏️ Cuerpo recibido en la API (Actualización de Rol):",
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

    const result = await RoleService.updateRole(req.params.id, req.body);
    if (!result.success) return res.status(400).json(result);
    res.json(result);
  } catch (error) {
    console.error("❌ Error en la actualización del rol:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor.", error });
  }
});

router.delete("/:id", async (req, res) => {
  const roleId = parseInt(req.params.id, 10);
  console.log("📌 ID recibido en DELETE:", roleId);

  const result = await RoleService.deleteRole(roleId);
  if (!result.success) return res.status(404).json(result);

  res.json(result);
});

module.exports = router;

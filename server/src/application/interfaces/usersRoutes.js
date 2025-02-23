const express = require("express");
const router = express.Router();
const UserService = require("../../domain/services/usersServices");


router.post("/", async (req, res) => {
  try {
      console.log("Cuerpo recibido en la API:", req.body); // Verifica que el `body` está bien estructurado
      
      if (!req.body || typeof req.body !== "object") {
          console.error("Error: Cuerpo de la petición no es un objeto válido", req.body);
          return res.status(400).json({ success: false, message: "Formato de datos incorrecto.", data: null, error: null });
      }

      const userResult = await UserService.createUser(req.body);

      if (!userResult.success) {
          return res.status(400).json(userResult);
      }

      return res.status(201).json(userResult);
  } catch (error) {
      console.error("Error inesperado en usersRoutes:", error);
      return res.status(500).json({ success: false, message: "Error en el servidor.", error });
  }
});

router.get("/:id", async (req, res) => {
  const result = await UserService.getUserById(req.params.id);
  if (!result.success) return res.status(404).json(result);
  res.json(result);
});

router.put("/:id", async (req, res) => {
  const result = await UserService.updateUser(req.params.id, req.body);
  if (!result.success) return res.status(400).json(result);
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const result = await UserService.deleteUser(req.params.id);
  if (!result.success) return res.status(404).json(result);
  res.json(result);
});

module.exports = router;

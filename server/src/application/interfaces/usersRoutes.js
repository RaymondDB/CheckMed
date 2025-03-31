const express = require("express");
const router = express.Router();
const UserService = require("../../domain/services/usersServices");
const { login, UserBService } = require("../../business/services/usersBServices");



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


router.get("/", async (req, res) => {
  const result = await UserService.getAllUsers();

  if (!result.success) return res.status(404).json(result);
  res.status(200).json(result);
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

console.log("LOGIN FUNC:", typeof login); // debería decir: function

router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;
  const result = await login({ Email, Password });

  if (!result.success) return res.status(401).json(result);
  res.status(200).json(result);
});


module.exports = router;

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./infrastructure/db/dbconfig");

// Importar rutas
const notificationRoutes = require("./application/interfaces/systemNotificationsRoutes");
const roleRoutes = require("./application/interfaces/systemRolesRoutes");
const statusRoutes = require("./application/interfaces/systemStatusRoutes");

dotenv.config(); // Cargar variables de entorno

const app = express();

app.use(cors());
app.use(express.json());

// Registrar rutas
app.use("/notifications", notificationRoutes);
app.use("/roles", roleRoutes);
app.use("/status", statusRoutes);

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await connectDB(); // Conectar a la base de datos antes de iniciar el servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(
      "❌ No se pudo iniciar el servidor debido a un error en la conexión de la base de datos:",
      err
    );
  }
})();

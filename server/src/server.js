const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./infrastructure/db/dbconfig");

// Importar rutas
const userRoutes = require("./application/interfaces/usersRoutes");
const doctorRoutes = require("./application/interfaces/usersDoctorRoutes");
const patientRoutes = require("./application/interfaces/usersPatientRoutes");

dotenv.config(); // Cargar variables de entorno

const app = express();

app.use(cors());
app.use(express.json());

// Registrar rutas
app.use("/users", userRoutes);
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);


const PORT = process.env.PORT || 3000;

(async () => {
    try {
      await connectDB();  // Esperamos a que la base de datos esté conectada antes de iniciar el servidor
      app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
      });
    } catch (err) {
      console.error('No se pudo iniciar el servidor debido a un error en la conexión de la base de datos:', err);
    }
  })();
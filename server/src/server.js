const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./infrastructure/db/dbconfig");

const AppointmentRoutes = require("./application/interfaces/AppointmentRoutes");
const StatusRoutes = require("./application/interfaces/StatusRoutes");

dotenv.config(); // Cargar variables de entorno

const app = express();

app.use(cors());
app.use(express.json());

app.use("/Appointment", AppointmentRoutes);
app.use("/Status", StatusRoutes);


const PORT = process.env.PORT || 3000;

(async () => {
    try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
      });
    } catch (err) {
      console.error('No se pudo iniciar el servidor debido a un error en la conexión de la base de datos:', err);
    }
  })();
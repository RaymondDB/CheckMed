const express = require('express');
const cors = require('cors');
const { connectDB } = require('./infrastructure/db/dbconfig.js');

const app = express();
app.use(cors());
app.use(express.json());



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
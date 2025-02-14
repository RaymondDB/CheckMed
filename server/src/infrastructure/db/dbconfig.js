const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: true
  }
};

// Definimos connectDB como función asíncrona
const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log('Conectado a SQL Server');
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
  }
};

// Asegúrate de exportar correctamente
module.exports = {
  connectDB
};
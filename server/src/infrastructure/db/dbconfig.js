require('dotenv').config();
const { Sequelize } = require ("sequelize");

const sequelize = new Sequelize({
  dialect: 'mssql',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10)  || 1433,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: true
  }
});

 
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('La conexión se ha establecido correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
};


module.exports = { sequelize, connectDB };
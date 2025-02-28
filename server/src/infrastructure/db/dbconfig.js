require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mssql",
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  dialectOptions: {
    encrypt: process.env.DB_ENCRYPT === "true", // `true` para Azure, `false` para local
    trustServerCertificate: true, // Confía en el certificado en conexiones locales
  },
  logging: false, // Desactiva logs SQL en consola (puedes cambiarlo a `true` si necesitas depuración)
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión establecida correctamente con SQL Server.");
  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos:", error);
    process.exit(1); // Detiene la aplicación si la conexión falla
  }
};

module.exports = { sequelize, connectDB };

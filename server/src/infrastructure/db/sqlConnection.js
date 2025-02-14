const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("MedicalAppointment", "sa", "your_password", {
    host: "localhost",
    dialect: "mssql",
    dialectOptions: { options: { encrypt: false, trustServerCertificate: true } }
});

module.exports = sequelize;

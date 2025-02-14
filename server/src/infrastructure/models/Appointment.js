const { DataTypes } = require("sequelize");
const sequelize = require("../db/sqlConnection");

const Appointment = sequelize.define("Appointment", {
    appointmentID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    patientID: { type: DataTypes.INTEGER, allowNull: false },
    doctorID: { type: DataTypes.INTEGER, allowNull: false },
    appointmentDate: { type: DataTypes.DATE, allowNull: false },
    statusID: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: true }
}, { tableName: "Appointments", schema: "appointments", timestamps: false });

module.exports = Appointment;

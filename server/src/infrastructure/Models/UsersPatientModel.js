const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconfig");

const PatientModel = sequelize.define("Patient", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  dateOfBirth: { type: DataTypes.DATE, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING },
  insuranceProviderId: { type: DataTypes.INTEGER, allowNull: true },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: "Patients",
  timestamps: true
});

module.exports = PatientModel;
const { sequelize } = require("../db/dbconfig");
const { DataTypes } = require("sequelize");

const PatientModel = sequelize.define("users.Patients", {
  id: { type: DataTypes.INTEGER, primaryKey: true},
  dateOfBirth: { type: DataTypes.DATE, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING },
  insuranceProviderId: { type: DataTypes.INTEGER, allowNull: true },
  isActive: { type: DataTypes.BOOLEAN}
}, {
  tableName: "users.Patients",
  timestamps: true
});

module.exports = PatientModel;
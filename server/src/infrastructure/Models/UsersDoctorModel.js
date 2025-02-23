const { sequelize } = require("../db/dbconfig"); 
const { DataTypes } = require("sequelize");

const DoctorModel = sequelize.define("users.Doctors", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  specialtyId: { type: DataTypes.INTEGER, allowNull: false },
  licenseNumber: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.STRING, allowNull: false },
  yearsOfExperience: { type: DataTypes.INTEGER, allowNull: false },
  education: { type: DataTypes.STRING, allowNull: false },
  bio: { type: DataTypes.STRING },
  consultationFee: { type: DataTypes.DECIMAL(10, 2) },
  clinicAddress: { type: DataTypes.STRING },
  isActive: { type: DataTypes.BOOLEAN }
}, {
  tableName: "users.Doctors",
  timestamps: true
});

module.exports = DoctorModel;
const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconfig");

const DoctorModel = sequelize.define("Doctor", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  specialtyId: { type: DataTypes.INTEGER, allowNull: false },
  licenseNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
  phoneNumber: { type: DataTypes.STRING, allowNull: false },
  yearsOfExperience: { type: DataTypes.INTEGER, allowNull: false },
  education: { type: DataTypes.STRING, allowNull: false },
  bio: { type: DataTypes.STRING },
  consultationFee: { type: DataTypes.DECIMAL(10, 2) },
  clinicAddress: { type: DataTypes.STRING },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: "Doctors",
  timestamps: true
});

module.exports = DoctorModel;
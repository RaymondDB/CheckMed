const { sequelize } = require("../db/dbconfig");
const { DataTypes } = require("sequelize");

const PatientModel = sequelize.define("users.Patients", {
  PatientID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  DateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  Gender: {
    type: DataTypes.CHAR(1),
    allowNull: false
  },
  PhoneNumber: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  Address: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  EmergencyContactName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  EmergencyContactPhone: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  BloodType: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  Allergies: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  InsuranceProviderID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CreatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, 
  },
  UpdatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, 
  },
  IsActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: "Patients",
  schema: "users",
  timestamps: false
});

module.exports = PatientModel;

const { sequelize } = require("../db/dbconfig"); 
const { DataTypes } = require("sequelize");

const DoctorModel = sequelize.define("users.Doctors", {
  DoctorID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  SpecialtyID: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  LicenseNumber: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  PhoneNumber: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  YearsOfExperience: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Education: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ConsultationFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  ClinicAddress: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  AvailabilityModeId: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  LicenseExpirationDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  CreatedAt: {
    type: DataTypes.DATEONLY,
    allowNull: false 
  },
  UpdatedAt: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  IsActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: "Doctors",
  schema: "users",
  timestamps: false
});

module.exports = DoctorModel;
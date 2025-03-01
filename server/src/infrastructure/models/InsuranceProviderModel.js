const sequelize = require("../config/dbconfig");
const { DataTypes } = require("sequelize");

const InsuranceProviderModel = sequelize.define("insurance.InsuranceProviders", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  contactNumber: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  website: { type: DataTypes.STRING, allowNull: true },
  address: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: true },
  state: { type: DataTypes.STRING, allowNull: true },
  country: { type: DataTypes.STRING, allowNull: true },
  zipCode: { type: DataTypes.STRING, allowNull: true },
  coverageDetails: { type: DataTypes.STRING, allowNull: false },
  logoUrl: { type: DataTypes.STRING, allowNull: true },
  isPreferred: { type: DataTypes.BOOLEAN, defaultValue: false },
  networkTypeId: { type: DataTypes.INTEGER, allowNull: true },
  customerSupportContact: { type: DataTypes.STRING, allowNull: true },
  acceptedRegions: { type: DataTypes.STRING, allowNull: true },
  maxCoverageAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: true  },
  isActive: { type: DataTypes.BOOLEAN}
}, {
  tableName: "insurance.InsuranceProviders",
  timestamps: true
});

module.exports = InsuranceProviderModel;
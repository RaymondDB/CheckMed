const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconfig");

const InsuranceNetworkTypeModel = sequelize.define("InsuranceNetworkType", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: "NetworkType",
  timestamps: true
});

module.exports = InsuranceNetworkTypeModel;
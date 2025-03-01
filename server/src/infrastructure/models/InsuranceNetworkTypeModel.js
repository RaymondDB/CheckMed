const sequelize = require("../config/dbconfig");
const { DataTypes } = require("sequelize");

const InsuranceNetworkTypeModel = sequelize.define("insurance.NetworkType", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  isActive: { type: DataTypes.BOOLEAN}
}, {
  tableName: "insurance.NetworkType",
  timestamps: true
});

module.exports = InsuranceNetworkTypeModel;
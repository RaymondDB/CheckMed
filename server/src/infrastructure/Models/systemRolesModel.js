const { sequelize } = require("../db/dbconfig");
const { DataTypes } = require("sequelize");

const RoleModel = sequelize.define(
  "roles",
  {
    roleId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    roleName: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    tableName: "roles",
    timestamps: true,
  }
);

module.exports = RoleModel;

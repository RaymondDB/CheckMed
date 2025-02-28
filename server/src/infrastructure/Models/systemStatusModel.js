const { sequelize } = require("../db/dbconfig");
const { DataTypes } = require("sequelize");

const StatusModel = sequelize.define(
  "status",
  {
    statusId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    statusName: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: "status",
    timestamps: true,
  }
);

module.exports = StatusModel;

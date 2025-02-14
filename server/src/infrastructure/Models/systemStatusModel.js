const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconfig");

const StatusModel = sequelize.define(
  "Status",
  {
    StatusID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    StatusName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "Status",
    timestamps: true,
  }
);

module.exports = StatusModel;

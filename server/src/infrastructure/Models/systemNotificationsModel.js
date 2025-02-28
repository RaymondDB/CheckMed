const { sequelize } = require("../db/dbconfig");
const { DataTypes } = require("sequelize");

const NotificationModel = sequelize.define(
  "notifications",
  {
    notificationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    message: { type: DataTypes.STRING(255), allowNull: false },
    sentAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "notifications",
    timestamps: true,
  }
);

module.exports = NotificationModel;

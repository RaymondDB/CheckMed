const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconfig");

const NotificationsModel = sequelize.define(
  "Notification",
  {
    NotificationID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    SentAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Notifications",
    timestamps: true,
  }
);

module.exports = NotificationsModel;

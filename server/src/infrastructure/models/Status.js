const { DataTypes } = require("sequelize");
const sequelize = require("../db/sqlConnection");

const Status = sequelize.define("Status", {
    statusID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    statusName: { type: DataTypes.STRING, allowNull: false }
}, { tableName: "Status", schema: "appointments", timestamps: false });

module.exports = Status;

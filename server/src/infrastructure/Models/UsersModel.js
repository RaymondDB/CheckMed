const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconfig");

const UserModel = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  roleId: { type: DataTypes.INTEGER, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: "Users",
  timestamps: true
});

module.exports = UserModel;
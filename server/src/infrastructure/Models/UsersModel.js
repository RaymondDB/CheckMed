const { sequelize } = require("../db/dbconfig"); 
const { DataTypes } = require("sequelize");

const UserModel = sequelize.define("users.Users", {
  UserID: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  FirstName: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  LastName: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  Email: { 
    type: DataTypes.STRING(255), 
    allowNull: false, 
    unique: true 
  },
  Password: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  RoleID: { 
    type: DataTypes.INTEGER, 
    allowNull: true  // En la BD permite NULL, así que lo dejamos así
  },
  CreatedAt: { 
    type: DataTypes.DATETIME, 
    allowNull: true  // Puede ser NULL según la BD
  },
  UpdatedAt: { 
    type: DataTypes.DATETIME, 
    allowNull: true  // Puede ser NULL según la BD
  },
  IsActive: { 
    type: DataTypes.BOOLEAN, 
    allowNull: false, 
    defaultValue: true 
  }
}, {
  tableName: "users.Users",  // Nombre exacto de la tabla
  schema: "users",     // Nombre del esquema en SQL Server
  timestamps: false    // Desactivamos timestamps automáticos de Sequelize
});

module.exports = UserModel;


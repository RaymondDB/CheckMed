const { sequelize } = require("../db/dbconfig"); 
const { DataTypes } = require("sequelize");

const InsuranceNetworkTypeModel = sequelize.define("Insurance.NetworkType", 
  {
  NetworkTypeId:{ type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  Name: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  },
  Description: { 
    type: DataTypes.STRING(255), 
    allowNull: true 
  },
  CreatedAt: { 
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  UpdatedAt: { 
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  IsActive: { 
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: "NetworkType",
  schema: "Insurance",
  timestamps: false
});

module.exports = InsuranceNetworkTypeModel;
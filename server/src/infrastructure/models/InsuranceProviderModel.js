const { sequelize } = require("../db/dbconfig"); 
const { DataTypes } = require("sequelize");

const InsuranceProviderModel = sequelize.define("Insurance.InsuranceProviders", {
  InsuranceProviderID: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  Name: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  ContactNumber: { 
    type: DataTypes.STRING(15), 
    allowNull: false
   },
  Email: { 
    type: DataTypes.STRING(100), 
    allowNull: false, 
    unique: true 
  },
  Website: { 
    type: DataTypes.STRING(255), 
    allowNull: true 
  },
  Address: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  City: { 
    type: DataTypes.STRING(100), 
    allowNull: true 
  },
  State: { 
    type: DataTypes.STRING(100), 
    allowNull: true 
  },
  Country: { 
    type: DataTypes.STRING(100), 
    allowNull: true 
  },
  ZipCode: { 
    type: DataTypes.STRING(10), 
    allowNull: true 
  },
  CoverageDetails: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  },
  LogoUrl: { 
    type: DataTypes.STRING(255), 
    allowNull: true 
  },
  IsPreferred: { 
    type: DataTypes.BOOLEAN,
    allowNull: false, 
    defaultValue: true
  },
  NetworkTypeId: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  CustomerSupportContact: { 
    type: DataTypes.STRING(15), 
    allowNull: true 
  },
  AcceptedRegions: { 
    type: DataTypes.STRING(255), 
    allowNull: true 
  },
  MaxCoverageAmount: { 
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: true  
  },
  CreatedAt: { 
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  UpdatedAt: { 
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  IsActive: { 
    type: DataTypes.BOOLEAN,
    allowNull: false, 
    defaultValue: true
  }
}, {
  tableName: "InsuranceProviders",
  schema: "Insurance",
  timestamps: false
});

module.exports = InsuranceProviderModel;
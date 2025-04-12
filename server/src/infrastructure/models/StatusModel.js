const { DataTypes, Model } = require('sequelize');

class StatusModel extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        }
      },
      {
        sequelize,
        modelName: 'status',
        tableName: 'statuses',
        timestamps: true
      }
    );
    return StatusModel;
  }

  static associate(models) {
    StatusModel.hasMany(models.AppointmentModel, {
      foreignKey: 'status_id',
      as: 'appointments'
    });
  }
}

module.exports = StatusModel;
const { DataTypes, Model } = require('sequelize');

class AppointmentModel extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false
        },
        status_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'statuses',
            key: 'id'
          }
        },
        patientName: {
          type: DataTypes.STRING,
          allowNull: false
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
        modelName: 'appointment',
        tableName: 'appointments',
        timestamps: true
      }
    );
    return AppointmentModel;
  }

  static associate(models) {
    AppointmentModel.belongsTo(models.StatusModel, {
      foreignKey: 'status_id',
      as: 'status'
    });
  }
}

module.exports = AppointmentModel;
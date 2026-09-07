'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeviceLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DeviceLog.init({
    imei: DataTypes.STRING,
    session_id: DataTypes.STRING,
    deviceType: DataTypes.INTEGER,
    data: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'DeviceLog',
    tableName: 'device_logs',
  });
  return DeviceLog;
};
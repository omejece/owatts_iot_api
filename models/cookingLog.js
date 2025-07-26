'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CookingLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CookingLog.init({
    imei: DataTypes.STRING,
    dataId: DataTypes.STRING,
    block_id: DataTypes.INTEGER,
    merchant_id: DataTypes.INTEGER,
    startTme: DataTypes.DATE,
    totalConsumption: DataTypes.DOUBLE(6),
    status: DataTypes.INTEGER,
    endTime: DataTypes.DATE,
    date_taken: DataTypes.DATEONLY,
    time_taken: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'CookingLog',
    tableName: 'cookingLogs'
  });
  return CookingLog;
};
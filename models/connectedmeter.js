'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class connectedmeter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      connectedmeter.belongsTo(models.genstarttime,{
        foreignKey:{
          name: 'genstarttime_id'
        }
      })
    }
  }
  connectedmeter.init({
    device_id: DataTypes.INTEGER,
    block_id: DataTypes.INTEGER,
    imei: DataTypes.STRING,
    genstarttime_id: DataTypes.INTEGER,
    duration: DataTypes.DOUBLE,
    gen_consumption: DataTypes.DOUBLE,
    last_captured: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'connectedmeter',
  });
  return connectedmeter;
};
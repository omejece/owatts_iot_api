'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class genstarttime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       genstarttime.hasOne(models.genofftime);
       genstarttime.hasMany(models.connectedmeter,{
           foreignKey:{
               name: 'genstarttime_id'
           }
       });
    }
  }
  genstarttime.init({
    device_id: DataTypes.INTEGER,
    imei: DataTypes.STRING,
    block_id: DataTypes.INTEGER,
    start_time: DataTypes.TIME,
    start_date: DataTypes.DATEONLY,
    off_time: DataTypes.TIME,
    off_date: DataTypes.DATEONLY,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'genstarttime',
  });
  return genstarttime;
};
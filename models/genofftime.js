'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class genofftime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        genofftime.belongsTo(models.genstarttime,{
           foreignKey:{
               name: 'genstarttime_id'
           }
        })
    }
  }
  genofftime.init({
    device_id: DataTypes.INTEGER,
    genstarttime_id: DataTypes.INTEGER,
    block_id: DataTypes.INTEGER,
    imei: DataTypes.STRING,
    end_time: DataTypes.TIME,
    end_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'genofftime',
  });
  return genofftime;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class consumption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
    
  };
  consumption.init({
    imei: DataTypes.STRING,
    merchant_id: DataTypes.INTEGER,
    block_id: DataTypes.INTEGER,
    device_type: DataTypes.INTEGER,
    data: {
      type: DataTypes.TEXT,
      set(value) {
        this.setDataValue('data',JSON.stringify(value));
      },
      get(value) {
         const rawValue = this.getDataValue('data');
         return JSON.parse(rawValue);
      }
    },
    day_taken: DataTypes.INTEGER,
    year_taken: DataTypes.INTEGER,
    month_taken: DataTypes.INTEGER,
    date_taken: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'consumption',
  });
  return consumption;
};
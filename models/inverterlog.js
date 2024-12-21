'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inverterlog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  inverterlog.init({
    imei: DataTypes.STRING,
    block_id: DataTypes.INTEGER,
    merchant_id: DataTypes.INTEGER,
    time_saved: DataTypes.DATE,
    data: {
      type: DataTypes.STRING,
      get(value) {
         const rawValue = this.getDataValue('data');
         return JSON.parse(rawValue);
      },
      set(value) {
        this.setDataValue('data',JSON.stringify(value));
      }
    }
  }, {
    sequelize,
    modelName: 'inverterlog',
  });
  return inverterlog;
};
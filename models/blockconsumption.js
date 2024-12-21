'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blockconsumption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blockconsumption.init({
    merchant_id: DataTypes.INTEGER,
    block_id: DataTypes.INTEGER,
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
    modelName: 'blockconsumption',
  });
  return blockconsumption;
};
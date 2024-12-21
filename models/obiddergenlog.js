'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class obiddergenlog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      obiddergenlog.belongsTo(models.block,{foreignKey:'block_id'});
    }
  };
  obiddergenlog.init({
    block_id: DataTypes.INTEGER,
    merchant_id: DataTypes.INTEGER,
    imei: DataTypes.STRING,
    start_time: DataTypes.DATE,
    stop_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'obiddergenlog',
  });
  return obiddergenlog;
};
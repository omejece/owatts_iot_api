'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      device.belongsTo(models.block,{foreignKey:'block_id'});
      device.belongsTo(models.devicetype,{foreignKey:'device_type'});
    }
  };
  device.init({
    block_id: DataTypes.INTEGER,
    merchant_id: DataTypes.INTEGER,
    imei: DataTypes.STRING,
    device_type: DataTypes.INTEGER,
    device_link_imei: DataTypes.STRING,
   // output: : DataTypes.INTEGER,
    //state: : DataTypes.INTEGER,
    data: {
      type: DataTypes.STRING,
      get(value) {
         const rawValue = this.getDataValue('data');
         return JSON.parse(rawValue);
      },
      set(value) {
        this.setDataValue('data',JSON.stringify(value));
      }
    },
    settings: {
      type: DataTypes.STRING,
      get(value) {
         const rawValue = this.getDataValue('settings');
         return JSON.parse(rawValue);
      },
      set(value) {
          this.setDataValue('settings',JSON.stringify(value));
      }
    },
    flags: {
      type: DataTypes.STRING,
      get(value) {
         const rawValue = this.getDataValue('flags');
         return JSON.parse(rawValue);
      },
      set(value) {
          this.setDataValue('flags',JSON.stringify(value));
      }
    }
  }, {
    sequelize,
    modelName: 'device',
  });
  return device;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class block extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       block.hasMany(models.device,{foreignKey:'block_id'});
    }
  };
  block.init({
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      reference: DataTypes.STRING,
      merchant_id: DataTypes.INTEGER,
      capacity: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      latitude: DataTypes.DOUBLE,
      data: {
        type: DataTypes.STRING,
        get(value) {
           const rawValue = this.getDataValue('data');
           try {
             return rawValue ? JSON.parse(rawValue) : null;
           } catch (e) {
             return null;
           }
        },
        set(value) {
          this.setDataValue('data',JSON.stringify(value));
        }
      }
  }, 
  {
    sequelize,
    modelName: 'block',
  });
  return block;
};
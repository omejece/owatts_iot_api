'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      block_id: {
        type: Sequelize.INTEGER
      },
      merchant_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      imei: {
        type: Sequelize.STRING
      },
      device_type: {
        type: Sequelize.INTEGER
      },
      device_link_imei: {
        type: Sequelize.STRING,
        allowNull: true
      },
      errorCorrectionFactor: {
        type: Sequelize.DOUBLE(10,4)
      },
      data: {
        type: Sequelize.STRING(1000),
        allowNull: true
      },
      settings: {
        type: Sequelize.STRING(1000),
        allowNull: true
      },
      flags: {
        type: Sequelize.STRING(1000),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('devices');
  }
};
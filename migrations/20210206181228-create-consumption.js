'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('consumptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      merchant_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      block_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      imei: {
        type: Sequelize.STRING
      },
      device_type: {
        type: Sequelize.INTEGER
      },
      data: {
        type: Sequelize.STRING(1000)
      },
      day_taken:{
        type: Sequelize.INTEGER
      },
      year_taken:{
        type: Sequelize.INTEGER
      },
      month_taken: {
        type: Sequelize.INTEGER
      },
      date_taken: {
        type: Sequelize.DATEONLY
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
    await queryInterface.dropTable('consumptions');
  }
};
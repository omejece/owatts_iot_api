'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('connectedmeters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      device_id: {
        type: Sequelize.INTEGER
      },
      block_id: {
        type: Sequelize.INTEGER
      },
      imei: {
        type: Sequelize.STRING
      },
      genstarttime_id: {
        type: Sequelize.INTEGER
      },
      duration: {
        type: Sequelize.DOUBLE(20,10)
      },
      gen_consumption: {
        type: Sequelize.DOUBLE(20,10)
      },
      last_captured: {
        type: Sequelize.DATE
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('connectedmeters');
  }
};
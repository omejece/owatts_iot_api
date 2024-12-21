'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('genstarttimes', {
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
      start_time: {
        type: Sequelize.TIME
      },
      start_date: {
        type: Sequelize.DATEONLY
      },
      off_time: {
        type: Sequelize.TIME
      },
      off_date: {
        type: Sequelize.DATEONLY
      },
      status: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('genstarttimes');
  }
};
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('runtimes', {
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
        type: Sequelize.INTEGER
      },
      imei: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.DOUBLE(20,4)
      },
      last_elapsed_time: {
        type: Sequelize.DOUBLE(20,4)
      },
      date_taken: {
        type: Sequelize.DATEONLY
      },
      time_taken: {
        type: Sequelize.TIME
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
    await queryInterface.dropTable('runtimes');
  }
};
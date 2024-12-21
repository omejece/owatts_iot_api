'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blockConsumptions', {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('blockConsumptions');
  }
};
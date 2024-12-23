'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blocks', {
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
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      reference: {
        type: Sequelize.STRING
      },
      capacity: {
        type: Sequelize.DOUBLE(10,2)
      },
      longitude: {
        type: Sequelize.DOUBLE(20,10),
        allowNull:true
      },
      latitude: {
        type: Sequelize.DOUBLE(20,10),
        allowNull:true
      },
      data: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('blocks');
  }
};

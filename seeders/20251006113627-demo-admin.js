'use strict';

const bcrypt = require('bcrypt-nodejs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admins', [{
      name: 'Admin User',
      email: 'd.conco@kikego.com',
      password: bcrypt.hashSync('admin', bcrypt.genSaltSync()),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', null, {});
  }
};

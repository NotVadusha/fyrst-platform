'use strict';
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];

    users.push({
      id: 1123,
      first_name: 'Admin',
      last_name: 'Admin',
      email: 'fakeemail@gmail.com',
      city: 'Kyiv',
      birthdate: new Date(),
      password: 'somepassword',
      createdAt: new Date(),
      updatedAt: new Date(),
      role_id: 3,
    });

    await queryInterface.bulkInsert('Users', users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

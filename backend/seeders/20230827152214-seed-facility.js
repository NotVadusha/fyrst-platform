'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const facilities = [];

    for (let i = 1; i < 4; i++) {
      facilities.push({
        logo: 'logo.png',
        name: faker.company.name(),
        city: faker.location.city(),
        address: faker.location.streetAddress(),
        description: faker.lorem.words(10),
        createdAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Facility', facilities);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Facility', null, {});
  },
};

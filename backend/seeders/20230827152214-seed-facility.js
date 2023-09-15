'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const facilities = [];

    for (let i = 1; i < 20; i++) {
      facilities.push({
        logo: 'logo.png',
        name: faker.company.name(),
        city: faker.location.city(),
        address: faker.location.streetAddress(),
        description: faker.lorem.paragraphs(3),
        createdAt: faker.date.past(),
      });
    }

    await queryInterface.bulkInsert('Facility', facilities);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Facility', null, {});
  },
};

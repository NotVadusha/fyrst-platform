'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timecards = [];

    for (let i = 1; i < 4; i++) {
      timecards.push({
        createdAt: faker.date.recent(),
        createdBy: 1123,
        bookingId: faker.number.int({ min: 1, max: 3 }),
        approvedBy: null,
        approvedAt: null,
        status: faker.helpers.arrayElement(['pending', 'approved', 'rejected', 'paid']),
      });
    }

    await queryInterface.bulkInsert('Timecards', timecards);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Timecards', null, {});
  },
};

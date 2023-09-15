'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timecards = [];

    for (let i = 1; i < 150; i++) {
      const status = faker.helpers.arrayElement(['pending', 'approved', 'rejected']);
      const createdAt = faker.date.past();
      let approvedAt = null;
      let approvedBy = null;

      if (status === 'approved') {
        approvedAt = faker.date.between({ from: createdAt, to: new Date() });
        approvedBy = faker.number.int({ min: 1, max: 19 });
      }

      timecards.push({
        createdAt,
        createdBy: faker.number.int({ min: 1, max: 19 }),
        bookingId: faker.number.int({ min: 1, max: 49 }),
        approvedBy,
        approvedAt,
        status,
        hoursWorked: faker.number.int({ min: 20, max: 40 }),
        lunchHours: faker.number.int({ min: 4, max: 8 }),
      });
    }

    const createdAt = faker.date.past();
    const approvedAt = faker.date.between({ from: createdAt, to: new Date() });

    timecards.push({
      createdAt,
      createdBy: 24,
      approvedBy: 23,
      approvedAt,
      status: 'approved',
      hoursWorked: 40,
      lunchHours: 5,
      bookingId: 99,
    });

    await queryInterface.bulkInsert('Timecards', timecards);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Timecards', null, {});
  },
};

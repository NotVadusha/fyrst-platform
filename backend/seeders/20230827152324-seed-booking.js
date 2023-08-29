'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bookings = [];

    for (let i = 1; i < 20; i++) {
      let status;
      const startDate = faker.date.past();
      const numberOfPositions = faker.number.int({ min: 1, max: 20 });
      const positionsAvailable = faker.number.int({ min: 0, max: numberOfPositions });

      if (positionsAvailable === 0) {
        status = 'completed';
      } else {
        status = faker.helpers.arrayElement(['pending', 'rejected', 'canceled']);
      }

      bookings.push({
        status: 'pending',
        numberOfPositions: faker.number.int({ min: 1, max: 20 }),
        facilitiesRate: 1,
        createdBy: faker.number.int({ min: 1, max: 19 }),
        sex: faker.person.sex(),
        age: faker.number.int({ min: 18, max: 60 }),
        education: faker.lorem.words(10),
        positionsAvailable: 1,
        workingHours: 1,
        pricePerHour: 0.01,
        notes: faker.lorem.paragraphs(3),
        facilityId: faker.number.int({ min: 1, max: 19 }),
        startDate,
        endDate: faker.date.between({ from: startDate, to: new Date() }),
        updatedAt: new Date(),
      });

      await queryInterface.bulkInsert('Bookings', bookings);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  },
};

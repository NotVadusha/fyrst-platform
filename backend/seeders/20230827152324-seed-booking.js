'use strict';
const { faker, fa } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bookings = [];

    for (let i = 1; i < 4; i++) {
      bookings.push({
        status: 'accepted',
        numberOfPositions: faker.number.int({ min: 1, max: 20 }),
        facilitiesRate: 1,
        createdBy: 1123,
        sex: faker.person.sex(),
        age: faker.number.int({ min: 18, max: 60 }),
        education: faker.lorem.words(5),
        positionsAvailable: 1,
        workingHours: 1,
        pricePerHour: 0.01,
        notes: faker.lorem.words(10),
        facilityId: faker.number.int({ min: 1, max: 3 }),
        startDate: faker.date.recent(),
        endDate: faker.date.recent(),
        updatedAt: new Date(),
        employersName: faker.person.fullName(),
      });

      await queryInterface.bulkInsert('Bookings', bookings);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  },
};

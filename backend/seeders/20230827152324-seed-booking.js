'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bookings = [];

    for (let i = 1; i < 50; i++) {
      let positionsAvailable, startDate, endDate;

      const status = faker.helpers.arrayElement(['pending', 'rejected', 'canceled', 'completed']);
      const createdAt = faker.date.past();
      const numberOfPositions = faker.number.int({ min: 1, max: 20 });
      const availableLanguages = ["english", "french", "arabic", "german", "spanish", "italian", "ukrainian"];
  
      const languages = [];
      while (languages.length < 3) {
        const language = availableLanguages[Math.floor(Math.random()*availableLanguages.length)];
        if (!languages.includes(language)) {
          languages.push(language);
        }
      }

      if (status === 'completed') {
        positionsAvailable = 0;
        startDate = faker.date.past();
        endDate = faker.date.between({ from: startDate, to: new Date() });
      } else {
        positionsAvailable = faker.number.int({ min: 0, max: numberOfPositions });
        startDate = faker.date.future();
        endDate = faker.date.between({ from: startDate, to: new Date('2025-1-1') });
      }

      bookings.push({
        status,
        numberOfPositions,
        facilitiesRate: 1,
        createdBy: faker.number.int({ min: 1, max: 19 }),
        sex: faker.person.sex(),
        age: faker.number.int({ min: 16, max: 45 }),
        languages,
        education: faker.lorem.words(10),
        positionsAvailable,
        workingHours: faker.number.int({ min: 10, max: 20 }),
        pricePerHour: faker.number.int({ min: 10, max: 40 }),
        notes: faker.lorem.paragraphs(3),
        facilityId: faker.number.int({ min: 1, max: 19 }),
        createdAt,
        startDate,
        endDate,
        updatedAt: new Date(),
        employersName: faker.person.fullName(),
      });

      bookings.push({
        status,
        numberOfPositions,
        facilitiesRate: 1,
        createdBy: faker.number.int({ min: 1, max: 19 }),
        sex: faker.person.sex(),
        age: faker.number.int({ min: 18, max: 60 }),
        education: faker.lorem.words(10),
        positionsAvailable,
        workingHours: faker.number.int({ min: 10, max: 20 }),
        pricePerHour: faker.number.int({ min: 10, max: 40 }),
        notes: faker.lorem.paragraphs(3),
        facilityId: 1,
        createdAt,
        startDate,
        endDate,
        updatedAt: new Date(),
        employersName: faker.person.fullName(),
      });
    }

    bookings.push({
      status: 'completed',
      numberOfPositions: 5,
      facilitiesRate: 1,
      createdBy: 23,
      sex: faker.person.sex(),
      age: faker.number.int({ min: 18, max: 60 }),
      education: faker.lorem.words(10),
      positionsAvailable: 4,
      workingHours: 40,
      pricePerHour: 20,
      notes: faker.lorem.paragraphs(3),
      facilityId: 14,
      createdAt: faker.date.past(),
      startDate: faker.date.past(),
      endDate: faker.date.past(),
      updatedAt: new Date(),
      employersName: faker.person.fullName(),
    });

    await queryInterface.bulkInsert('Bookings', bookings);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  },
};

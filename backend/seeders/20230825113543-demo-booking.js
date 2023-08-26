'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', [
      {
        status: 'accepted',
        numberOfPositions: 1,
        facilitiesRate: 1,
        createdBy: 14113,
        sex: 'woman',
        age: 18,
        education: 'colleage',
        positionsAvailable: 1,
        workingHours: 1,
        pricePerHour: 0.01,
        notes: 'test',
        facilityId: 1,
        startDate: '2023-08-08',
        endDate: '2023-08-30',
      },
      ,
      {
        status: 'pending',
        numberOfPositions: 5,
        facilitiesRate: 4.5,
        createdBy: 1123,
        sex: 'man',
        age: 22,
        education: 'National Aviation University',
        positionsAvailable: 3,
        workingHours: 5,
        pricePerHour: 20,
        notes: 'Cool boy',
        facilityId: 5,
        startDate: '2023-08-08',
        endDate: '2023-08-30',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

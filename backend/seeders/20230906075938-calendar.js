'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const calendars = [];

    const platformAdmin = {
      userId: 20,
    };

    const facilityManager = {
      userId: 21,
    };

    const worker = {
      userId: 22,
    };

    calendars.push(platformAdmin, facilityManager, worker);

    await queryInterface.bulkInsert('Calendar', calendars);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Calendar', null, {});
  },
};

'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const permissions = [];

    for (let i = 1; i < 20; i++) {
      permissions.push({ userId: i });
    }

    const platformAdmin = {
      userId: 20,
      manageBookings: true,
      manageTimecards: true,
      manageUsers: true,
    };

    const facilityManager = {
      userId: 21,
      manageBookings: false,
      manageTimecards: true,
      manageUsers: false,
    };

    const worker = {
      userId: 22,
      manageBookings: false,
      manageTimecards: false,
      manageUsers: false,
    };

    const paymentWorker = {
      userId: 24,
      manageBookings: false,
      manageTimecards: true,
      manageUsers: false,
    };

    const paymentManager = {
      userId: 23,
      manageBookings: false,
      manageTimecards: true,
      manageUsers: false,
    };

    permissions.push(platformAdmin, facilityManager, worker, paymentWorker, paymentManager);

    await queryInterface.bulkInsert('Permissions', permissions);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {});
  },
};

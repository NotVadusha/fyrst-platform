'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];
    for (let i = 1; i < 20; i++) {
      data.push({
        userId: i,
        bookings: faker.datatype.boolean(),
        timecards: faker.datatype.boolean(),
        paymentSuccess: faker.datatype.boolean(),
        passwordChange: faker.datatype.boolean(),
        weeklyReport: faker.datatype.boolean(),
        moneySent: faker.datatype.boolean(),
      });
    }
    await queryInterface.bulkInsert('Notifications-Config', data, {});
    return data;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notifications-Config', null, {});
  },
};

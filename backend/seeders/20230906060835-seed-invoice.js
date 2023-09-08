'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const invoices = [];

    for (let i = 1; i < 150; i++) {
      const status = faker.helpers.arrayElement(['pending', 'completed', 'failed']);
      const createdAt = faker.date.past();
      const updatedAt = createdAt

      invoices.push({
        amountPaid: faker.number.int({ min: 1000, max: 3000 }),
        status,
        timecardId: i,
        createdAt,
        updatedAt,
      });
    }
    
    await queryInterface.bulkInsert('Invoices', invoices);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Invoices', null, {});
  }
};

'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const payments = [];

    for (let i = 1; i < 150; i++) {
      const status = faker.helpers.arrayElement(['pending', 'completed', 'failed']);
      const createdAt = faker.date.past();
      const updatedAt = createdAt

      payments.push({
        amountPaid: faker.number.int({ min: 1000, max: 3000 }),
        type: "Stripe",
        instapay: 100,
        status,
        approved: false,
        timecardId: i,
        createdAt,
        updatedAt,
        stripePaymentId: null
      });
    }
    
    await queryInterface.bulkInsert('Payments', payments);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Payments', null, {});
  }
};

'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const taxes = [];

    for (let i = 1; i < 151; i++) {
      taxes.push({
        name: 'Local',
        percentage: 5,
        paymentId: i,
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      }, {
        name: 'Stripe fee',
        percentage: 2.9,
        paymentId: i,
        additionalAmount: 0.3,
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      })
    }
    
    await queryInterface.bulkInsert('Taxes', taxes);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Taxes', null, {});
  }
};

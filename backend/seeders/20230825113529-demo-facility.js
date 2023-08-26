'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Facility', [
    {
      id: 1,
      logo: 'logo.png',
      name: 'Healthcare worker',
      city: 'Kyiv',
      address: 'street',
      description: 'Hello world',
      createdAt: new Date(),
    },
    {
      id: 2,
      logo: 'logo.png',
      name: 'Driver',
      city: 'Lviv',
      address: 'street',
      description: 'Hello world',
      createdAt: new Date(),
    },
  ]);
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
}

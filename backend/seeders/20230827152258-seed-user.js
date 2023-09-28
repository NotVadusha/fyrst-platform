'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];

    for (let i = 1; i < 20; i++) {
      users.push({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        phone_number: faker.phone.number('501-###-###'),
        city: faker.location.city(),
        birthdate: faker.date.birthdate(),
        password: faker.internet.password(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        is_confirmed: true,
        role_id: 1,
      });
    }

    const platformAdmin = {
      first_name: 'Dan',
      last_name: 'Olekh',
      email: 'platform-admin@fyrst.site',
      city: 'Kyiv',
      birthdate: faker.date.birthdate(),
      password: '$2a$12$BfwCC5c4ZBHTPrbH/XHAg.UCLNMbcNJoXdV5OgdPw5iQ1GP6FoPvW',
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      role_id: 3,
      is_confirmed: true,
    };

    const facilityManager = {
      first_name: 'Marissa',
      last_name: 'Wendi',
      email: 'facility-manager@fyrst.site',
      city: 'Kyiv',
      birthdate: faker.date.birthdate(),
      password: '$2a$12$BfwCC5c4ZBHTPrbH/XHAg.UCLNMbcNJoXdV5OgdPw5iQ1GP6FoPvW',
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      role_id: 2,
      is_confirmed: true,
      facility_id: 1,
    };

    const worker = {
      first_name: 'Dale',
      last_name: 'Campbell',
      email: 'worker@fyrst.site',
      city: 'Kyiv',
      birthdate: faker.date.birthdate(),
      password: '$2a$12$BfwCC5c4ZBHTPrbH/XHAg.UCLNMbcNJoXdV5OgdPw5iQ1GP6FoPvW',
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      role_id: 1,
      is_confirmed: true,
    };

    const paymentTestManager = {
      first_name: 'Garry',
      last_name: 'Miller',
      email: 'paymentmanager@fyrst.site',
      phone_number: '+380997654321',
      city: 'Kyiv',
      birthdate: faker.date.birthdate(),
      password: '$2a$12$BfwCC5c4ZBHTPrbH/XHAg.UCLNMbcNJoXdV5OgdPw5iQ1GP6FoPvW',
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      role_id: 2,
      is_confirmed: true,
      facility_id: 14,
    };

    const paymentTestWorker = {
      first_name: 'Ivan',
      last_name: 'Ivanov',
      email: 'paymentworker@fyrst.site',
      city: 'Kyiv',
      phone_number: '+380991234567',
      birthdate: faker.date.birthdate(),
      password: '$2a$12$BfwCC5c4ZBHTPrbH/XHAg.UCLNMbcNJoXdV5OgdPw5iQ1GP6FoPvW',
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      role_id: 1,
      is_confirmed: true,
      facility_id: 14,
    };
  
    users.push(platformAdmin, facilityManager, worker, paymentTestManager, paymentTestWorker);

    await queryInterface.bulkInsert('Users', users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

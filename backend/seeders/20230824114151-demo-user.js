'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        id: 14113,
        first_name: 'Tom',
        last_name: 'Tomenko',
        email: 'fakeemail@gmail.com',
        city: 'Kyiv',
        birthdate: new Date(),
        password: 'somesecretpassword123',
        createdAt: new Date(),
        updatedAt: new Date(),
        role_id: 1,
      },
      {
        id: 1123,
        first_name: 'Bob',
        last_name: 'Bobenko',
        email: 'bob123@example.com',
        city: 'Zhytomyr',
        birthdate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'asdasda123',
        role_id: 2,
      },
      {
        id: 2345,
        first_name: 'Alice',
        last_name: 'Alicova',
        email: 'alice@example.com',
        city: 'Prague',
        birthdate: new Date('1985-12-10'),
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'pass456',
        role_id: 2,
      },
      {
        id: 3456,
        first_name: 'John',
        last_name: 'Johnson',
        email: 'john@example.com',
        city: 'New York',
        birthdate: new Date('1992-03-20'),
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'secure789',
        role_id: 1,
      },
      {
        id: 4567,
        first_name: 'Ella',
        last_name: 'Ellington',
        email: 'ella@example.com',
        city: 'Los Angeles',
        birthdate: new Date('1988-07-05'),
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'ellapass123',
        role_id: 2,
      },
      {
        id: 5678,
        first_name: 'Sam',
        last_name: 'Samuelson',
        email: 'sam@example.com',
        city: 'Sydney',
        birthdate: new Date('1994-11-28'),
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'samsPassword',
        role_id: 1,
      },
      {
        id: 6789,
        first_name: 'Linda',
        last_name: 'Lindstrom',
        email: 'linda@example.com',
        city: 'Stockholm',
        birthdate: new Date('1991-08-22'),
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'lindaPass456',
        role_id: 2,
        phone_number: '+46712345678',
      },
      {
        id: 7890,
        first_name: 'Michael',
        last_name: 'Michaelsen',
        email: 'michael@example.com',
        city: 'Berlin',
        birthdate: new Date('1987-02-03'),
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'michaelPass789',
        role_id: 1,
        phone_number: '+49123456789',
      }
      
    ])
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

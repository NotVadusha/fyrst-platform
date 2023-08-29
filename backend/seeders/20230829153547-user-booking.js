'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userBooking = [];

    // Arrow function to generate a unique booking object
    const generateUniqueBooking = () => {
      const user_id = faker.number.int({ max: 20, min: 1 });
      const booking_id = faker.number.int({ max: 20, min: 1 });

      // Check if the combination of user_id and booking_id already exists
      const isDuplicate = userBooking.some(
        booking => booking.user_id === user_id && booking.booking_id === booking_id,
      );

      // If it's a duplicate, generate a new combination
      if (isDuplicate) {
        return generateUniqueBooking();
      }

      // If it's not a duplicate, create the booking object
      const booking = {
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        user_id,
        booking_id,
      };

      return booking;
    };
    for (let i = 0; i < 40; i++) {
      const uniqueBooking = generateUniqueBooking();
      userBooking.push(uniqueBooking);
    }
    await queryInterface.bulkInsert('user_bookings', userBooking);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_bookings', null, {});
  },
};

'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const generateNotification = (id, recipientId, refId) => {
      const typeOptions = ['bookings', 'timecards', 'messenger'];
      const type = faker.helpers.arrayElement(typeOptions);
      const content =
        type === 'bookings'
          ? `Booking accepted by ${faker.person.firstName()} ${faker.person.lastName()}.`
          : type === 'timecards'
          ? `Timecards accepted by ${faker.person.firstName()} ${faker.person.lastName()}.`
          : `${faker.person.firstName()} ${faker.person.lastName()} wrote the message.`;

      return {
        id,
        createdAt: faker.date.recent(),
        content,
        isRead: faker.datatype.boolean(),
        recipientId,
        type,
        refId,
      };
    };

    const recipientIds = [20, 21, 22];
    const seedData = [];

    for (let i = 0; i < 20; i++) {
      const recipientId = faker.helpers.arrayElement(recipientIds);
      const refId = i;
      seedData.push(generateNotification(i, recipientId, refId));
    }

    await queryInterface.bulkInsert('Notifications', seedData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notifications', null, {});
  },
};

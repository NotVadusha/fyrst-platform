'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Notifications-Config', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Make sure to match the actual table name
          key: 'id',
        },
      },
      notifications: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {
          timecards: true,
          bookings: true,
          paymentSuccess: true,
          passwordChange: true,
          weeklyReport: true,
          moneySent: true,
        },
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Notifications-Config');
  },
};

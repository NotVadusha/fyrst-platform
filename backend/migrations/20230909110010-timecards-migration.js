'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Timecards', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Make sure to match the actual table name
          key: 'id',
        },
      },
      bookingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Bookings', // Make sure to match the actual table name
          key: 'id',
        },
      },
      approvedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Make sure to match the actual table name
          key: 'id',
        },
      },
      approvedAt: {
        type: Sequelize.DATEONLY,
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Approved', 'Rejected'),
        allowNull: false,
      },
      hoursWorked: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      lunchHours: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Timecards');
  },
};

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'accepted', 'rejected', 'canceled', 'completed'),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      numberOfPositions: {
        type: Sequelize.INTEGER,
      },
      facilitiesRate: {
        type: Sequelize.FLOAT,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Make sure to match the actual table name
          key: 'id',
        },
      },
      sex: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      education: {
        type: Sequelize.TEXT,
      },
      positionsAvailable: {
        type: Sequelize.INTEGER,
      },
      workingHours: {
        type: Sequelize.INTEGER,
      },
      pricePerHour: {
        type: Sequelize.FLOAT,
      },
      notes: {
        type: Sequelize.TEXT,
      },
      startDate: {
        type: Sequelize.DATE,
      },
      languages: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      endDate: {
        type: Sequelize.DATE,
      },
      facilityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Facility', // Make sure to match the actual table name
          key: 'id',
        },
      },
      employersName: {
        type: Sequelize.STRING,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  },
};

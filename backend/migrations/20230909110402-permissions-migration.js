'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Permissions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Make sure to match the actual table name
          key: 'id',
        },
      },
      manageTimecards: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      manageBookings: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      manageUsers: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Permissions');
  },
};

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Taxes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      percentage: {
        type: Sequelize.DOUBLE(3, 2),
      },
      additionalAmount: {
        type: Sequelize.DOUBLE(10, 2),
      },
      timecardId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Timecards',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Taxes');
  }
};
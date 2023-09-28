'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Invoices', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      amountPaid: {
        type: Sequelize.DOUBLE(20, 2),
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Approved', 'Rejected'),
      },
      path: {
        type: Sequelize.STRING,
      },
      timecardId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Timecards',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Invoices');
  },
};

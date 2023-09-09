'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Payments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      stripePaymentId: {
        type: Sequelize.STRING,
      },
      amountPaid: {
        type: Sequelize.DOUBLE(20, 2),
      },
      type: {
        type: Sequelize.STRING,
      },
      instapay: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Approved', 'Rejected'),
      },
      approved: {
        type: Sequelize.BOOLEAN,
      },
      timecardId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Timecards', // Make sure to match the actual table name
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
    await queryInterface.dropTable('Payments');
  },
};

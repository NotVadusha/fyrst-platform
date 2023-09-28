'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User-profile', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      languages: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      education: {
        type: Sequelize.TEXT,
      },
      sex: {
        type: Sequelize.TEXT,
      },
      avatar: {
        type: Sequelize.TEXT,
      },
      stripeAccountId: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User-profile');
  },
};

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.TEXT,
      },
      last_name: {
        type: Sequelize.TEXT,
      },
      email: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      city: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_confirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      document_number: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
      chatId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Chats',
          key: 'id',
        },
      },
      facility_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Facility',
          key: 'id',
        },
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
    await queryInterface.dropTable('Users');
  },
};

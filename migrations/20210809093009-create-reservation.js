'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.UUID
      },
      date_w: {
        type: Sequelize.DATE
      },
      details: {
        type: Sequelize.STRING
      },
      commune: {
        type: Sequelize.STRING
      },
      quartier: {
        type: Sequelize.STRING
      },
      avenue: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      gravite: {
        type: Sequelize.ENUM
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
    await queryInterface.dropTable('reservations');
  }
};
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('materiel_specs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      libele: {
        type: Sequelize.STRING
      },
      nom_type: {
        type: Sequelize.STRING
      },
      valeur_type: {
        type: Sequelize.STRING
      },
      matiere: {
        type: Sequelize.STRING
      },
      origine: {
        type: Sequelize.STRING
      },
      prix_unitaire: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('materiel_specs');
  }
};
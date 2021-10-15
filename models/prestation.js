'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class prestation extends Model {
    static associate(models) {
      this.belongsTo(models.affectation, { foreignKey: 'affectationId' });

      this.belongsToMany(models.travail, { through: models.prestation_travail });
      this.hasMany(models.prestation_travail);

      this.belongsToMany(models.materiel_spec, { through: models.prestation_matSpec });
      this.hasMany(models.prestation_matSpec);
    }
  }

  prestation.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    heure_arr: DataTypes.DATE,
    description: DataTypes.STRING,
    affectationId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    duree: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    etat: {
      type: DataTypes.ENUM,
      values: ['terminée', 'en cours', 'annulée']
    }
  }, {
    sequelize,
    modelName: 'prestation',
  });
  return prestation;
};
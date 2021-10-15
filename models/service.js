'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service extends Model {
    static associate(models) {
      this.hasMany(models.materiel);
      this.hasMany(models.gamme_travaux, { as: 'gamme_travaux' });
      this.hasMany(models.reservation);
    }
  };
  service.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    nom_service: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    nomination: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    chef_service: {
      type: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 'service',
  });
  return service;
};
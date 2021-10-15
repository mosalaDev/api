'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class artisan extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: 'userId' });
      this.hasMany(models.affectation, { as: 'affectations' });
      this.belongsTo(models.zone, { foreignKey: 'zoneId' });
      this.belongsTo(models.service, { foreignKey: 'serviceId' });
      this.belongsToMany(models.travail, { through: models.specialite_artisan, as: { singular: 'specialite', plural: 'specialites' } });
      this.hasMany(models.specialite_artisan);
      this.hasMany(models.certificat);
    }
  }

  artisan.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    tranche_age: {
      type: DataTypes.STRING,
    },
    naissance: {
      type: DataTypes.DATE,
    },
    organisation: {
      type: DataTypes.STRING,
    },
    adresse_travail: {
      type: DataTypes.STRING,
    },
    zoneId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    formateurs: {
      type: DataTypes.STRING,
      allowNull: false
    },
    debut_experience: {
      type: DataTypes.STRING,
      allowNull: false
    },
    etique: {
      type: DataTypes.ENUM,
      values: ['Vérifié', 'Non vérifié'],
      defaultValue: 'Non vérifié'
    },
    etat: {
      type: DataTypes.ENUM,
      values: ['actif', 'inactif'],
      defaultValue: 'inactif'
    },
    status: {
      type: DataTypes.ENUM,
      values: ['disponible', 'indisponible', 'affecté'],
      defaultValue: 'disponible'
    },
    position: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      defaultValue: Sequelize.NULL
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    serviceId: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'artisan',
  });
  return artisan;
};
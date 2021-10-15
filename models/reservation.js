'use strict';
const {
  Model, Sequelize
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class reservation extends Model {
    static associate(models) {
      this.hasOne(models.affectation);
      this.hasOne(models.reservation_annulee);
      this.belongsTo(models.service, { foreignKey: 'serviceId' });
      this.belongsTo(models.zone, { foreignKey: 'zoneId' });
      this.belongsTo(models.user, { foreignKey: 'userId' });
      this.hasMany(models.reservation_travail);
      this.belongsToMany(models.travail, { through: models.reservation_travail, as: 'travaux' });
      this.belongsTo(models.reservation, { as: 'originale', foreignKey: 'originaleId' });
    }
  }

  reservation.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    date_w: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.DATE
    },
    commune: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quartier: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avenue: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      defaultValue: Sequelize.NULL
    },
    details: {
      type: DataTypes.STRING,
    },
    autresTravaux: {
      type: DataTypes.STRING
    },
    gravite: {
      type: DataTypes.ENUM,
      values: ['urgence', 'retardé'],
      allowNull: false,
      defaultValue: 'retardé',
    },
    serviceId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    autreTel: {
      type: DataTypes.STRING(10),
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    zoneId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    etat: {
      type: DataTypes.ENUM,
      values: ['en cours', 'validée', 'rejetée', 'prestée', 'annulée'],
      defaultValue: 'en cours',
      allowNull: false
    },
    originaleId: {
      type: DataTypes.UUID,
    }
  }, {
    sequelize,
    modelName: 'reservation',
  });
  return reservation;
};
'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasOne(models.artisan);
      user.hasMany(models.demande_devis);
      user.hasMany(models.reservation);
    }
  }

  user.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    },
    nom: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    postnom: {
      type: DataTypes.STRING(20),
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sexe: {
      type: DataTypes.ENUM,
      values: ['M', 'F'],
      allowNull: false
    },
    ville: {
      type: DataTypes.STRING(50),
    },
    commune: {
      type: DataTypes.STRING(50),
    },
    quartier: {
      type: DataTypes.STRING(40),
    },
    tel: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    account_type: {
      type: DataTypes.ENUM,
      values: ['artisan', 'default', 'client', 'anonymous'],
      defaultValue: "default",
      allowNull: false
    },
    mot_passe: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
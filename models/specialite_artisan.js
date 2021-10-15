'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class specialite_artisan extends Model {
    static associate(models) {
      this.belongsTo(models.artisan, { foreignKey: 'artisanId' });
      this.belongsTo(models.travail, { foreignKey: 'travailId' });
    }
  }

  specialite_artisan.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    niveau: {
      type: DataTypes.ENUM,
      values: ['Non vérifié', 'Vérifié'],
      defaultValue: 'Non vérifié'
    },
    artisanId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    travailId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'specialite_artisan',
  });
  return specialite_artisan;
};
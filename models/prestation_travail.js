'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prestation_travail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      prestation_travail.belongsTo(models.prestation, { foreignKey: 'prestationId' });
      prestation_travail.belongsTo(models.travail, { foreignKey: 'travailId' });
    }
  };
  prestation_travail.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    prestationId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    travailId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'prestation_travail',
  });
  return prestation_travail;
};
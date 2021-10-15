'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class poste_droit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.droit, { foreignKey: 'droitId' });
      this.belongsTo(models.poste, { foreignKey: 'posteId' });
    }
  }

  poste_droit.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    droitId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    posteId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'poste_droit',
  });
  return poste_droit;
};
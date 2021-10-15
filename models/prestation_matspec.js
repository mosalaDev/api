'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prestation_matSpec extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      prestation_matSpec.belongsTo(models.prestation, { foreignKey: 'prestationId' });
      prestation_matSpec.belongsTo(models.materiel_spec, { foreignKey: 'materielSpecId' });
    }
  };
  prestation_matSpec.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    quantite: {
      type: DataTypes.FLOAT
    },
    details: DataTypes.STRING,
    prestationId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    materielSpecId: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'prestation_matSpec',
  });
  return prestation_matSpec;
};
'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class demandeDevis_matSpec extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      demandeDevis_matSpec.belongsTo(models.materiel_spec, { foreignKey: 'materielSpecId' });
      demandeDevis_matSpec.belongsTo(models.demande_devis, { foreignKey: 'demandeDeviId' });
    }
  };
  demandeDevis_matSpec.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    quantite: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    materielSpecId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    demandeDeviId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'demandeDevis_matSpec',
  });
  return demandeDevis_matSpec;
};
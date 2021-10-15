'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class demande_devis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      demande_devis.belongsTo(models.user, { foreignKey: 'userId' });

      demande_devis.belongsToMany(models.materiel_spec, { through: models.demandeDevis_matSpec });
      demande_devis.hasMany(models.demandeDevis_matSpec);
    }
  };
  demande_devis.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    libele: DataTypes.STRING,
    details: DataTypes.STRING,
    userId: {
      type: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 'demande_devis',
  });
  return demande_devis;
};
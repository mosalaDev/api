'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class materiel_spec extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.materiel, { foreignKey: 'materielId' });

      this.belongsToMany(models.prestation, { through: models.prestation_matSpec });
      this.hasMany(models.prestation_matSpec);

      this.belongsToMany(models.demande_devis, { through: models.demandeDevis_matSpec });
      this.hasMany(models.demandeDevis_matSpec);
    }
  };
  materiel_spec.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    nom_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valeur_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    matiere: DataTypes.STRING,
    origine: DataTypes.STRING,
    prix_unitaire: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    materielId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'materiel_spec',
  });
  return materiel_spec;
};
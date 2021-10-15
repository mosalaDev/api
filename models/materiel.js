'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class materiel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      materiel.belongsTo(models.service, { foreignKey: 'serviceId' });
      materiel.hasMany(models.materiel_spec);

      materiel.belongsToMany(models.travail, { through: models.travail_materiel });
      materiel.hasMany(models.travail_materiel);
    }
  };
  materiel.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    nom_materiel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quatification: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serviceId: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'materiel',
  });
  return materiel;
};
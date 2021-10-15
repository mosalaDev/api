'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class travail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.gamme_travaux, { foreignKey: 'gammeTravauxId', as: 'gamme' });

      this.belongsToMany(models.categorie_travail, { through: models.categorie_travail_travail, as: 'categories' });
      this.hasMany(models.categorie_travail_travail);

      this.belongsToMany(models.prestation, { through: models.prestation_travail });
      this.hasMany(models.prestation_travail);

      this.belongsToMany(models.artisan, { through: models.specialite_artisan });
      this.hasMany(models.specialite_artisan);

      this.belongsToMany(models.materiel, { through: models.travail_materiel });
      this.hasMany(models.travail_materiel);

      this.belongsToMany(models.reservation, { through: models.reservation_travail });
      this.hasMany(models.reservation_travail);
    }
  }

  travail.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    nom_travail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    objet: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    gammeTravauxId: {
      type: DataTypes.UUID,
      // allowNull: false
    },
  }, {
    sequelize,
    modelName: 'travail',
  });
  return travail;
};